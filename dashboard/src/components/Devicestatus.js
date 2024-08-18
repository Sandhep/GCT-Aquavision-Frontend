import React,{useEffect} from 'react'
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import {setstatus} from "../features/status";
import { setcolor } from '../features/color';
import io from "socket.io-client";


function Devicestatus() {
  
  const socket=io.connect(process.env.REACT_APP_SERVER_URL);

  const dispatch = useDispatch();
  const status = useSelector(state => state.status.value);
  const color = useSelector(state => state.statuscolor.value);
  
  useEffect(()=>{

    const handlestatus =(data)=>{
      dispatch(setstatus({status:data.device_status})); 
      if(data.device_status === "Online"){
        dispatch(setcolor({statuscolor:"green"}));
      }else{
        dispatch(setcolor({statuscolor:"red"}));
      }
    }

    socket.on("connected",handlestatus);
    socket.on("Device_status",handlestatus);

    return () => {
      socket.off("connected",handlestatus); 
    };
     
  },[socket,dispatch]);
  
  return (
    <div>
      <Typography variant="h6" color={color}>
         {status}
       </Typography>
    </div>
  )
}

export default Devicestatus
