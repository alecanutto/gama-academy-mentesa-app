import React, { useEffect, useRef, useState } from 'react';
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
import { IValidationErrors } from '../../../shared/interfaces';
import { CircularProgress } from '@mui/material';
import { Copyright } from '../../../shared/components';

const theme = createTheme();

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<IValidationErrors>({});

  const inputName = useRef<HTMLInputElement | null>();
  const inputEmail = useRef<HTMLInputElement | null>();
  const inputPassword = useRef<HTMLInputElement | null>();

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setError({});
    if (name.trim() && email.trim() && password.trim()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, password]);

  function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              inputRef={inputName}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={evt => setName(evt.target.value)}
              error={!!error?.name}
              helperText={error?.name}
            />
            <TextField
              inputRef={inputEmail}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={evt => setEmail(evt.target.value)}
              error={!!error?.email}
              helperText={error?.email}
            />
            <TextField
              inputRef={inputPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={evt => setPassword(evt.target.value)}
              error={!!error?.password}
              helperText={error?.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              disabled={disabled}
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
          <Copyright sx={{ mt: 6, mb: 2 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};
