import { useContext, useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import * as yup from 'yup'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginStatusQuery, useUserLoginMutation } from '../../api/dataApi';
import { loginStatus } from '../../contextApi/GlobalApi';

const defaultTheme = createTheme();

export default function SignInSide() {

    const [jwt, setJwt] = useState("")

    const [userLogin] = useUserLoginMutation()
    const { data: status, isSuccess } = useLoginStatusQuery(jwt)

    const { setIsLoggedIn, setLogUser } = useContext(loginStatus)
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        // Load remember me preference from localStorage when component mounts
        const rememberMePreference = localStorage.getItem('rememberMe');
        if (rememberMePreference) {
            setRememberMe(JSON.parse(rememberMePreference));
        }
    }, []);

    const checkoutSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("required"),
        password: yup.string().required("required")
    })

    if (isSuccess) {
        setIsLoggedIn(status)
    }
    console.log("status: ", status);

    const submitValidation = async (values, { resetForm }) => {
        try {
            console.log(values);
            const response = await userLogin(values);
            console.log("response", response);
            if (response.data.msg === "success") {
                toast.success("User logged successfully");
                resetForm();
                console.log(response.data.token);
                setJwt(response.data.token)
                setIsLoggedIn(status)
                setLogUser(response.data.user)
            } else {
                toast.error("User login failed");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error("Error occurred while logging in");
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://cdn2.hubspot.net/hubfs/4223538/what-is-order-management-system.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <Box sx={{ width: '100%' }}>
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}
                                validationSchema={checkoutSchema}
                                onSubmit={submitValidation}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit
                                }) => (
                                    <Form onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={!!touched.email && !!errors.email && <Typography variant='p' color="red" sx={{ display: 'block' }}>{errors.email}</Typography>}
                                            helperText={touched.email && errors.email}
                                        />

                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={!!touched.password && !!errors.password && <Typography variant='p' color="red" sx={{ display: 'block' }}>{errors.password}</Typography>}
                                            helperText={touched.password && errors.password}
                                        />

                                        <FormControlLabel sx={{ display: 'block' }}
                                            control={<Checkbox value={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />}
                                            label="Remember me"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Sign In
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href="#" variant="body2">
                                                    Forgot password?
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link href="/signup" variant="body2">
                                                    {"Don't have an account? Sign Up"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    );
}