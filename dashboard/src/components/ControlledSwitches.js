import React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from "axios";

function ControlledSwitches() {
  const [checked, setChecked] = React.useState(false);
  const [state, setState] = React.useState('OFF');
  const [captchaInput, setCaptchaInput] = React.useState('');
  const [captchaValid, setCaptchaValid] = React.useState(false);

  const expectedCaptcha = '12345'; 

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    if (captchaValid) {
      setChecked(isChecked);
      setState(isChecked ? 'ON' : 'OFF');
      handlechecked(isChecked);
      if (!isChecked) {
        setCaptchaValid(false);
        setCaptchaInput('');
      }
    }
  };

  //Get Request to server

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        setChecked(response.data.message)
        setState(response.data.message ? 'ON' : 'OFF');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []); 

  // Post Request to Server

  const handlechecked = async (isChecked) => {
    try {
        const response = await axios.post('http://localhost:5000/api/postData', 
        {
            data: isChecked 
        });
        console.log(response);
    } catch (error) {
        console.error('Error:', error);
    }
  };
  
  const handleCaptchaChange = (event) => {
    setCaptchaInput(event.target.value);
  };

  const validateCaptcha = () => {
    if (captchaInput === expectedCaptcha) {
      setCaptchaValid(true);
    } else {
      setCaptchaValid(false);
      alert('Invalid Password. Please try again.');
    }
  };

  return (
    <Box>
      <TextField
        label="Enter Password"
        variant="outlined"
        value={captchaInput}
        onChange={handleCaptchaChange}
        disabled={captchaValid}
        type="password"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        onClick={validateCaptcha}
        disabled={captchaValid}
        fullWidth
        sx={{ mb: 2 }}
      >
        Verify
      </Button>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            color="warning"
            disabled={!captchaValid}
          />
        }
        label={state}
      />
    </Box>
  );
}

export default ControlledSwitches;
