import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getdDisplayDataAPI } from "../../../apis/profileAPI";
const defaultTheme = createTheme();

export default function ShowProfile() {
    //Call API
    const {
        data = [],
        isLoading,
        isError,
        error,
      } = useQuery({
        queryKey: ["banner"],
        queryFn: getdDisplayDataAPI,
      });
    return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Header />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ mt: 3, fontWeight: 700, color: "white" }}
            variant="h3"
          >
            Your profile
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 150,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                borderRadius: "50%",
                ml: 15,
                mt: 2,
              }}
              src= {data?.avatar ?? 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'}
            />
            <TextField
              margin="normal"
              fullWidth
              id="FullName"
              value={data?.fullname?? "Nguyen Van A"}
              name="FullName"
              autoComplete="FullName"
              autoFocus
              sx={{ bgcolor: "white" }}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              value={data?.email?? "nguyenvana@gmail.com"}
              name="email"
              autoComplete="email"
              sx={{ bgcolor: "white" }}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              name="Phone"
              value={data?.Phone?? "0903856628"}
              id="Phone"
              autoComplete="Phone"
              sx={{ bgcolor: "white" }}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              name="Facebook"
              id="Facebook"
              value= {data?.Facebook?? "Facebook.com/hi"}
              autoComplete="Facebook"
              sx={{ bgcolor: "white" }}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              name="Instagram"
              id="Instagram"
              value={data?.Instagram??"Instagram.com/hi"}
              autoComplete="Instagram"
              sx={{ bgcolor: "white" }}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              name="Linkedin"
              id="Linkedin"
              value={data?.Linkedin??"Linkedin.com/hi"}
              autoComplete="Linkedin"
              sx={{ bgcolor: "white" }}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              name="Company_Name"
              id="Company_Name"
              value={data?.Company_Name??"DEFCON"}
              autoComplete="Company_Name"
              sx={{ bgcolor: "white" }}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              name="Company_URL"
              id="Company_URL"
              value={data?.Company_URL??"https://company.com"}
              autoComplete="Company_URL"
              sx={{ bgcolor: "white" }}
              disabled
            />
          </Box>
          <Footer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
