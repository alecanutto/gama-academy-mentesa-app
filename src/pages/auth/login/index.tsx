import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Switch,
} from '@mui/material';
import { Copyright } from '../../../shared/components';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../../shared/contexts';
import toast, { Toaster } from 'react-hot-toast';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type Inputs = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { isAuthenticated, error, isLoading, login } = useAuthContext();

  const [remember, setRemember] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  function handleSignIn({ email, password }: Inputs) {
    login(email, password)
      .then(response => {
        if (isAuthenticated) console.log('then', response);
      })
      .finally(() => {
        if (error) toast.error(error);
      });
  }

  return (
    <>
      <CssBaseline />
      <Toaster position="top-right" reverseOrder={false} />
      <Container component="main" maxWidth="xs">
        <Box
          boxShadow={3}
          borderRadius={2}
          padding={2}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Área Reservada
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleSignIn)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register('email', {
                minLength: 3,
                maxLength: 60,
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Favor informar um email válido',
                },
              })}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register('password', {
                minLength: 8,
                maxLength: 20,
                required: 'Senha é obrigatória',
              })}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  name="lembrar"
                />
              }
              label="Lembrar o usuário"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              // disabled={disabled}
              endIcon={
                isLoading ? (
                  <CircularProgress
                    variant="indeterminate"
                    color="inherit"
                    size={20}
                  />
                ) : undefined
              }
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" underline="hover">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="register" variant="body2" underline="hover">
                  Ainda não tem uma conta?
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 4, mb: 2 }} />
        </Box>
      </Container>
    </>
  );
};
