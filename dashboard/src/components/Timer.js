import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Button, FormControl, TextField } from '@mui/material';
import { settime } from '../features/time';
import { settimer } from '../features/timerswitch';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';
import { set_timerbutton } from '../features/timerbutton';

const socket = io.connect(process.env.REACT_APP_SERVER_URL);

export default function Timer() {
  const dispatch = useDispatch();
  const timedata = useSelector(state => state.time.value);
  const timerdata = useSelector(state => state.timer.value);
  const timerbutton = useSelector(state => state.timerbutton.value);

  const [startTemp, setStartTemp] = useState(timedata.starttime ? dayjs(timedata.starttime, 'HH:mm') : null);
  const [endTemp, setEndTemp] = useState(timedata.endtime ? dayjs(timedata.endtime, 'HH:mm') : null);

  useEffect(() => {
    const handletimer = (data) => {
      dispatch(settimer({
        mode: data.Timer === "ENABLED" ? true : false,
        modestate: data.Timer
      }));
    };

    const handletimerdata = (data) => {
      let startTemp = data.starttime ? dayjs(data.starttime, 'HH:mm') : null;
      let endTemp = data.endtime ? dayjs(data.endtime, 'HH:mm') : null;
      let bt_state = data.bt_state;
      dispatch(settime({
        starttime: startTemp ? startTemp.format('HH:mm') : null,
        endtime: endTemp ? endTemp.format('HH:mm') : null,
      }));
      dispatch(set_timerbutton({ bt_state }));

      setStartTemp(startTemp);
      setEndTemp(endTemp);
    }

    socket.on("connected", handletimer);
    socket.on("connected", handletimerdata);
    socket.on("Received_Timermode", handletimer);
    socket.on("Received_Timerdata", handletimerdata);

    return () => {
      socket.off("connected", handletimer);
      socket.off("connected", handletimerdata);
    }
  }, [dispatch]);

  const handleSetTime = () => {
    if (!startTemp || !endTemp) {
      alert('Time field is Empty');
      return;
    }

    dispatch(settime({
      starttime: startTemp ? startTemp.format('HH:mm') : null,
      endtime: endTemp ? endTemp.format('HH:mm') : null
    }));

    dispatch(set_timerbutton({
      bt_state: "SAVED"
    }));

    socket.emit("Timerdata", {
      starttime: startTemp.format('HH:mm'),
      endtime: endTemp.format('HH:mm'),
      bt_state: "SAVED",
    });
  };

  const handleStartChange = (newValue) => {
    setStartTemp(newValue);
    dispatch(set_timerbutton({
      bt_state: "SET TIME"
    }));
  };

  const handleEndChange = (newValue) => {
    setEndTemp(newValue);
    dispatch(set_timerbutton({
      bt_state: "SET TIME"
    }));
  };

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    const state = isChecked ? "ENABLED" : "DISABLED";
    dispatch(settimer({
      mode: isChecked,
      modestate: state
    }));

    socket.emit("Timermode", { Timer: state });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControlLabel
        control={
          <Switch
            checked={timerdata.mode}
            onChange={handleChange}
          />
        }
        label={timerdata.modestate}
      />
      <Stack spacing={2} sx={{ minWidth: 305, width: '100%' }}>
        <FormControl sx={{ width: '100%' }}>
          <Typography variant="subtitle1">Start Time</Typography>
          <TimePicker
            value={startTemp}
            onChange={handleStartChange}
            referenceDate={dayjs('2022-04-17')}
            disabled={!timerdata.mode}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </FormControl>
        <FormControl sx={{ width: '100%' }}>
          <Typography variant="subtitle1">Stop Time</Typography>
          <TimePicker
            value={endTemp}
            onChange={handleEndChange}
            referenceDate={dayjs('2022-04-17')}
            disabled={!timerdata.mode}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </FormControl>
        <Button
          variant="contained"
          onClick={handleSetTime}
          disabled={!timerdata.mode}
          sx={{ 
            alignSelf: 'flex-start'
           }}
        >
          {timerbutton.bt_state}
        </Button>
      </Stack>
    </LocalizationProvider>
  );
}
