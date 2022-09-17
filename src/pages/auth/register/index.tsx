import React, { useCallback, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Copyright } from '../../../shared/components';
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { api } from '../../../shared/services/api/axios-config';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSignUp = useCallback(
    async ({ name, email, password }: Inputs) => {
      setLoading(true);
      await api
        .post('/auth/signup', { name, email, password })
        .then(res => {
          if (res.status === 201) {
            toast.success('Cadastro realizado com sucesso');
            navigate('/login');
          }
        })
        .catch(err => toast.error(err.response.data.message))
        .finally(() => setLoading(false));
    },
    []
  );

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
            onSubmit={handleSubmit(handleSignUp)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register('name', {
                minLength: 3,
                maxLength: 150,
                required: 'Nome é obrigatório',
              })}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
              error={!!errors.name}
              helperText={errors.name?.message}
            />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              disabled={isLoading}
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
              Cadastrar
            </Button>
            <Grid container sx={{ justifyContent: 'end' }}>
              <Grid item>
                <Link href="login" variant="body2" underline="hover">
                  Já possui uma conta?
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
