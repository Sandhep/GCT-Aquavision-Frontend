import React,{useEffect} from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {setmode} from "../features/mode";


const socket=io.connect(process.env.REACT_APP_SERVER_URL);

function Mode() {

  const dispatch = useDispatch();
  const modedata = useSelector(state=> state.mode.value);

  useEffect(() => {
    const handleMode = (data) => {
      dispatch(setmode({
        mode:data.Plant_mode === "AUTO" ? true : false,
        modestate:data.Plant_mode
    }))
    };
    socket.on("connected",handleMode);
    socket.on("Received_Mode",handleMode);

    return ()=>{
      socket.off("connected",handleMode);
    }

  }, [dispatch]); 

  const handleChange = (Event) =>{
    const isChecked = Event.target.checked;
    const state = isChecked ? "AUTO" : "MANUAL";
    dispatch(setmode({
        mode:isChecked,
        modestate:state
    }))
    socket.emit("Mode",{Plant_mode:state});
  }
  
  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={modedata.mode}
            onChange={handleChange}
          />
        }
        label={modedata.modestate}
      />
    </div>
  )
}

export default Mode;
