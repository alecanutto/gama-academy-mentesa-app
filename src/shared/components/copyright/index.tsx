import { Link, Typography } from '@mui/material';

export const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link
        fontWeight={800}
        underline="hover"
        color="inherit"
        href="https://github.com/alecanutto/gama-academy-mentesa-app.git"
        target="_blank"
      >
        {' Mente SÃ'}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
