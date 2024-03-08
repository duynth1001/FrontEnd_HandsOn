import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {'Design by Duy'}
    </Typography>
  );
}

const defaultTheme = createTheme({
    palette: {
      background: {
        default: "black", 
      },
    },
  });

export default function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CssBaseline />
    
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            color:'white'
          }}
        >
          <Container maxWidth="sm">
            <Typography sx={{color:'white'}} variant="body1">
              DEFCON ALL RIGHT RESERVED
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}