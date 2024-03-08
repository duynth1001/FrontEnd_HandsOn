import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import GoogleSVG from "../../../assets/GoogleIcon.svg";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./index.css";
import SignInSidePanel from "../../../assets/SiginSidePanel.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/path";
import { useAuth } from "../../../contexts/UserContext/UserContext";
import { useMutation } from "@tanstack/react-query";
import { SigninAPI } from "../../../apis/userAPI";
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const defaultTheme = createTheme();

const schemaSignin = yup.object({
  email: yup
    .string()
    .required("Please enter your email")
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please enter correct email format"
    ),
  password: yup.string().required("Please enter your password"),
});

export default function SignIn() {

  //default settings
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //navigate page
  const navigate = useNavigate()

  //form initiate
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    password: "",
    },
    resolver: yupResolver(schemaSignin),
    mode: "all",
  });

  //Use context 
  const { currentUser, handleSignin: handleSigninContext } = useAuth();


  //API call to authenticate Sign In
  const { mutate: handleSignin } = useMutation({
    mutationFn: (values) => SigninAPI(values), 
    //values -> user data
    onSuccess: (values) => {
      //local storage
      handleSigninContext(values);
      navigate(PATH.DASHBOARD)
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  //Submit form
  const onSubmit = (formValues)=>{
    handleSignin(formValues)
    //FOR DEMO
    navigate(PATH.DASHBOARD)
  }

  //Log in fail -> navigate to root page
  if (!currentUser) {
    <Navigate to={PATH.SIGN_IN}/>
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container  maxWidth={false} disableGutters >
        <CssBaseline />
          <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundImage:`url(${SignInSidePanel})`,
            height:'100vh'
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 40,
                fontFamily: "Sixtyfour",
                color: "white",
                mt:8
              }}
            >
              DEFCON
            </Typography>

            <br />
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "white",
                  fontFamily: "Hacked-KerX",
                }}
              >
                Email
              </Typography>
              <TextField
                sx={{ width: 370, bgcolor: "white",borderRadius:3 }}
                placeholder="info@defcon.com"
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={Boolean(errors.email) && errors.email.message}
              ></TextField>
              <br />
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "white",
                  fontFamily: "Hacked-KerX",
                }}
              >
                Password
              </Typography>
              <TextField
                sx={{ width: 370, bgcolor: "white",borderRadius:3 }}
                placeholder="***********"
                {...register("password")}
                error={Boolean(errors.password)}
                helperText={Boolean(errors.password) && errors.password.message}
                type={showPassword ? "text" : "password"}
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
              ></TextField>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Item>
                    <FormControlLabel
                      control={
                        <Checkbox value="remember" sx={{ color: "white" }} />
                      }
                      label={
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontFamily: "Hacked-KerX",
                            color: "white",
                          }}
                        >
                          Remember me
                        </Typography>
                      }
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item sx={{ mt: 1.2, ml: 6.7 }}>
                    <Link
                      href="#"
                      sx={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: "white",
                        textDecoration: "none",
                        fontFamily: "Hacked-KerX",
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Item>
                </Grid>
              </Grid>

              <br />
              <Button
                type="submit"
                fullWidth
                sx={{
                  "&:hover": {
                    backgroundColor: "grey",
                  },
                  textTransform: "none",
                  borderRadius: 2,
                  color: "black",
                  bgcolor: "white",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 20,
                    fontFamily: "Hacked-KerX",
                  }}
                >
                  Sign in
                </Typography>
              </Button>
              <br />
              <Root
                sx={{
                  width: 370,
                  fontSize: 15,
                  fontFamily: "Hacked-KerX",
                  color: "white",
                }}
              >
                <Divider>or</Divider>
              </Root>
              <br />
              <Button
                sx={{
                  textTransform: "none",
                  color: "black",
                  fontWeight: 700,
                  bgcolor: "white",
                  width: 370,
                  borderRadius: 2,
                  border: 1,
                  "&:hover": {
                    backgroundColor: "grey",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 550,
                    fontSize: 20,
                    fontFamily: "Hacked-KerX",
                  }}
                >
                  <Icon >
                    <img src={GoogleSVG} height={20} width={20} />
                  </Icon>{" "}
                  Sign in with Google
                </Typography>
              </Button>
              <br />
              <Link
                href="#"
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: "white",
                  pl: 11,
                  textDecoration: "none",
                  fontFamily: "Hacked-KerX",
                }}
              >
                {"New to Defcon? Create an Account"}
              </Link>
            </Box>
          </Box>
      </Container>
    </ThemeProvider>
  );
}
