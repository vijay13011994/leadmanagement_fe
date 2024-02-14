import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Paper } from '@mui/material'
import React, { useState } from 'react';
import { loginService } from '../../services/login.service';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/loginbg.jpg';
export default function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = async () => {
    try {
      const msg = await loginService({ username, password });
      navigate('/user/dashboard')
    } catch (e) {
      alert(e);
    }

  }

  return (
    <div>
      <Box
        marginLeft='33%'
        marginTop='10%'
        position='relative'
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '50%',
            height: '40vh',
          },
        }}
      >
        <Paper elevation={3}>
          <center>
            <br /><br/>
            <FormControl style={{ justifyContent: 'center' }} sx={{ m: 2, width: '35ch' }} variant="filled">
              <InputLabel htmlFor="filled-adornment-username">Username</InputLabel>
              <FilledInput
                size='small'
                id="filled-adornment-username"
                type={'text'}
                onChange={(e) => setusername(e.target.value)}
              />
            </FormControl>
            <br />
            <FormControl style={{ justifyContent: 'center' }} sx={{ m: 1, width: '35ch' }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
              <FilledInput
                size='small'
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={(e) => setpassword(e.target.value)}
              />
            </FormControl>
            <br />
            <br />
            <Button variant="contained" color='success' disableElevation onClick={login}>
              Submit
            </Button>
          </center>
        </Paper>
      </Box>
    </div>
  )
}
