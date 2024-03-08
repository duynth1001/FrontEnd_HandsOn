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
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useMutation } from "@tanstack/react-query";
import { updateFormAPI } from "../../../apis/editProfileAPI";
const defaultTheme = createTheme();

export default function Profile() {
  const { handleSubmit, register, control, setValue, watch } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      FBUrl: "",
      InstaUrl: "",
      LinkdeUrl: "",
      compName: "",
      compURL: "",
      compPhoto: "",
      UserAvatar: undefined,
    },
  });
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const img2 = watch("UserAvatar"); // [0]
  const previewImage = (file) => {
    return URL.createObjectURL(file);
  };

  const { mutate: handleUpdateForm } = useMutation({
    mutationFn: (payload) => updateFormAPI(payload),
    onSuccess: () => {
      console.log('ok');
    },
  });

 const onSubmit = (formValues)=>{
    const formData = new FormData()
    formData.append("fullname",formValues.fullname)
    formData.append("email",formValues.email)
    formData.append("phone",formValues.phone)
    formData.append("FBUrl",formValues.FBUrl)
    formData.append("InstaUrl",formValues.InstaUrl)
    formData.append("LinkdeUrl",formValues.LinkdeUrl)
    formData.append("compName",formValues.compName)
    formData.append("compURL",formValues.compURL)
    formData.append("compPhoto",formValues.compPhoto)
    formData.append("UserAvatar",formValues.UserAvatar[0])
    handleUpdateForm(formData)
 }
  useEffect(() => {}, [watch]);
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
            Public profile
          </Typography>
          <Typography
            component="h1"
            sx={{ mt: 1, color: "white" }}
            variant="h5"
          >
            Add information about yourself
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box
  component="img"
  sx={{
    height: 233,
    width: 150,
    maxHeight: { xs: 233, md: 167 },
    maxWidth: { xs: 350, md: 250 },
    borderRadius:'50%',
    ml:15,
    mt:2
  }}
  src= {img2?? 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'}
/>
              {!img2  && (
              <Button
                component="label"
                variant="contained"
                sx={{  color: "black",
                bgcolor: "white",
                "&:hover": {
                  backgroundColor: "#4B8673", // Background color on hover
                },}}
              >
                <CameraAltIcon/>
                <VisuallyHiddenInput
                  type="file"
                  {...register("UserAvatar")}
                  accept=".png,.gif,.jpg"
                />
              </Button>
            )}
            {img2?.length > 0 && (
              <>
                <img src={previewImage(img2[0])} width={240} />
                <Button sx={{color:'white'}} onClick={() => setValue("UserAvatar", undefined)}>
                  Remove
                </Button>
              </>
            )}
            <TextField
              margin="normal"
              fullWidth
              id="FullName"
              label="Full Name"
              name="FullName"
              autoComplete="FullName"
              autoFocus
              sx={{ bgcolor: "white" }}
              variant="filled"
              {...register("fullname")}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              sx={{ bgcolor: "white" }}
              variant="filled"
              {...register("email")}
            />
            <TextField
              margin="normal"
              fullWidth
              name="Phone"
              label="Phone"
              id="Phone"
              autoComplete="Phone"
              sx={{ bgcolor: "white" }}
              variant="filled"
              {...register("phone")}
            />
            <TextField
              margin="normal"
              fullWidth
              name="Facebook"
              label="Facebook URL"
              id="Facebook"
              autoComplete="Facebook"
              sx={{ bgcolor: "white" }}
              variant="filled"
              {...register("FBUrl")}
            />
            <TextField
              margin="normal"
              fullWidth
              name="Instagram"
              label="Instagram URL"
              id="Instagram"
              autoComplete="Instagram"
              sx={{ bgcolor: "white" }}
              variant="filled"
              {...register("InstaUrl")}
            />
            <TextField
              margin="normal"
              fullWidth
              name="Linkedin"
              label="Linkedin URL"
              id="Linkedin"
              autoComplete="Linkedin"
              sx={{ bgcolor: "white" }}
              variant="filled"
              {...register("LinkdeUrl")}
            />
            <TextField
              margin="normal"
              fullWidth
              name="Company_Name"
              label="Company Name"
              id="Company_Name"
              autoComplete="Company_Name"
              sx={{ bgcolor: "white" }}
              variant="filled"
              {...register("compName")}
            />
            <TextField
              margin="normal"
              fullWidth
              name="Company_URL"
              label="Company URL"
              id="Company_URL"
              autoComplete="Company_URL"
              sx={{ bgcolor: "white" }}
              variant="filled"
              {...register("compURL")}
            />
            <TextField
              margin="normal"
              fullWidth
              name="Company_Photo"
              label="Company Photo"
              id="Company_Photo"
              autoComplete="Company_Photo"
              sx={{ bgcolor: "white",mb:2 }}
              variant="filled"
              {...register("compPhoto")}
            />
               
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                color: "black",
                bgcolor: "white",
                "&:hover": {
                  backgroundColor: "#4B8673", // Background color on hover
                },
              }}
            >
              Save
            </Button>
          </Box>
          <Footer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
