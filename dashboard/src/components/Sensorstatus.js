import React,{useEffect} from 'react'
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import {setsensordata} from "../features/sensordata"
import io from "socket.io-client";


const socket=io.connect(process.env.REACT_APP_SERVER_URL);

function Sensorstatus() {

  const dispatch = useDispatch();
  const sensordata = useSelector(state => state.sensordata.value);
  const pumpstatus = useSelector(state => state.switchstate.value);
  const modedata = useSelector(state=> state.mode.value);
  const timerdata = useSelector(state=> state.timer.value)
  
  useEffect(() => {
    const handlesensordata = (data) => {
      dispatch(setsensordata({
        OHT_Float:data.OHT_Float,
        UGT_Float:data.UGT_Float
    }))
    };
    socket.on("connected",handlesensordata);
    socket.on("Sensordata",handlesensordata);

    return ()=>{
      socket.off("connected",handlesensordata);
    }

  }, [dispatch]); 

  return (
    <div>
      <Typography variant="subtitle1">
        Overhead Tank Float Switch  is <span style={{color:sensordata.OHT_Float === "ON" ? "green" : "red"}}>{sensordata.OHT_Float}</span> 
      </Typography>
      <Typography variant="subtitle1">
        Underground Tank Float Switch  is <span style={{color:sensordata.UGT_Float === "ON" ? "green" : "red"}}>{sensordata.UGT_Float}</span>
      </Typography>
      <Typography variant="subtitle1">
        Timer is <span style={{color:timerdata.modestate === "ENABLED" ? "red" : "green"}}>{timerdata.modestate}</span>
      </Typography>
      <Typography variant="subtitle1">
        Pump is <span style={{color:pumpstatus === "ON" ? "red" : "green"}}>{pumpstatus}</span>
      </Typography>
      <Typography variant="subtitle1">
        Plant Mode is <span style={{color:modedata.modestate === "AUTO" ? "red" : "green"}}>{modedata.modestate}</span>
      </Typography>
    </div>
  )
}

export default Sensorstatus;




