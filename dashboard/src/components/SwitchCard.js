import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../features/switch";
import { changeposition } from '../features/switchstate';
import io from "socket.io-client";
import { useEffect } from 'react';


function SwitchCard() {

  const socket=io.connect(process.env.REACT_APP_SERVER_URL);

  const dispatch = useDispatch();
  const g_checked = useSelector(state => state.switch.value);
  const g_state = useSelector(state => state.switchstate.value);

  const handleChange = async(event) => {
    const isChecked = event.target.checked;
    dispatch(toggle({ checked: isChecked }));
    dispatch(changeposition({ position: isChecked ? 'ON' : 'OFF' }));
    socket.emit("PumpState",{Pump_State:isChecked ? "ON":"OFF"});
  };
  
  useEffect(() => {
    const handlePumpState = (data) => {
      dispatch(toggle({ checked: data.Pump_State === "ON" ? true : false }));
      dispatch(changeposition({ position: data.Pump_State }));
      socket.off("connected",handlePumpState); 
    };
    socket.on("connected",handlePumpState);
    socket.on("Received_PumpState",handlePumpState);

    return () => {
      socket.off("connected",handlePumpState); 
    };
     
  },[dispatch,socket]); 
  
  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={g_checked}
            onChange={handleChange}
          />
        }
        label={g_state}
      />
    </Box>
  );
}

export default SwitchCard;
