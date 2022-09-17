import { ReactNode } from 'react';
import {
  Icon,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';

import { useDrawerContext } from '../contexts';
import { Copyright } from '../components';

interface ILayoutBaseProps {
  title: string;
  children: ReactNode;
  toolbar?: ReactNode;
}
export const LayoutBase: React.FC<ILayoutBaseProps> = ({
  children,
  title,
  toolbar,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={2}
        display="flex"
        alignItems="center"
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipses"
          variant={smDown ? 'h6' : mdDown ? 'h5' : 'h4'}
        >
          {title}
        </Typography>
      </Box>

      {toolbar && <Box>{toolbar}</Box>}

      <Box flex={1} overflow="auto">
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          mt: 'auto',
          padding: '1rem',
          borderTop: '1px solid #d2d2d2 ',
          background: '#fff',
        }}
      >
        <Copyright />
      </Box>
    </Box>
  );
};
