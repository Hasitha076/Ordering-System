import { useContext, useState } from "react";
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
import { useCreateUserMutation, useLoginStatusQuery, useUserLoginMutation } from '../../api/dataApi';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";

const defaultTheme = createTheme();

export default function SignUp() {

    const [createUser] = useCreateUserMutation()
    const [isChecked, setIsChecked] = useState(false)

    const phoneRegExp =
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

    const checkoutSchema = yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        email: yup.string().email("invalied email").required("required"),
        password: yup.string().required("required"),
        rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
        phoneNumber: yup
            .string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("required"),
        image: yup.mixed().required("Image is required")
    })

    const submitValidation = async (values, { resetForm }) => {
        console.log(values);
        const image = values.image

        let imageUrl = ""; // Variable to hold the image URL

        if (image) {
            try {
                // Create a storage reference
                const storageRef = ref(
                    storage,
                    `users/${Math.random()}-${image.name}`
                )

                // Upload the file and wait for the upload to complete
                const snapshot = await uploadBytes(storageRef, image);

                // Get the download URL and wait for it
                imageUrl = await getDownloadURL(snapshot.ref);

            } catch (error) {
                // Handle any errors in the upload or URL retrieval process
                console.error("Error in image upload or URL retrieval", error);
                return; // Exit the function if there's an error
            }

        } else {
            console.error("No image to upload.");
            return; // Exit the function if there's no image
        }

        console.log("Image URL:", imageUrl);
        values["imgUrl"] = imageUrl
        console.log(values);

        createUser(
            values
        )

        resetForm()

        if (!values) {
            toast.error("Error occured!");
            return;
        }
        toast.success("User created successfully");
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="secondary" sx={{ height: '100vh' }}>
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
                            Sign Up
                        </Typography>

                        <Box sx={{ width: '100%' }}>
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    password: "",
                                    rePassword: "",
                                    phoneNumber: "",
                                    image: ""
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
                                    handleSubmit,
                                    setFieldValue
                                }) => (
                                    <Form onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                                        <Grid container mt="20px" spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="given-name"
                                                    required
                                                    fullWidth
                                                    id="firstName"
                                                    label="First Name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.firstName}
                                                    name='firstName'
                                                    error={!!touched.firstName && !!errors.firstName}
                                                    helperText={touched.firstName && errors.firstName}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="lastName"
                                                    label="Last Name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.lastName}
                                                    name='lastName'
                                                    error={!!touched.lastName && !!errors.lastName}
                                                    helperText={touched.lastName && errors.lastName}

                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.email}
                                                    name='email'
                                                    error={!!touched.email && !!errors.email}
                                                    helperText={touched.email && errors.email}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Password"
                                                    type="password"
                                                    id="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.password}
                                                    name='password'
                                                    error={!!touched.password && !!errors.password}
                                                    helperText={touched.password && errors.password}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Re-Password"
                                                    type="password"
                                                    id="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.rePassword}
                                                    name='rePassword'
                                                    error={!!touched.rePassword && !!errors.rePassword}
                                                    helperText={touched.rePassword && errors.rePassword}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Phone Number"
                                                    type="number"
                                                    id="phoneNumber"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.phoneNumber}
                                                    name='phoneNumber'
                                                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    type="file"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                        setFieldValue("image", e.target.files[0])
                                                    }}
                                                    value={values.file}
                                                    error={!!touched.image && !!errors.image}
                                                    helperText={touched.image && errors.image}
                                                    sx={{ gridColumn: "span 1" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControlLabel
                                                    control={<Checkbox value="allowExtraEmails" checked={isChecked} onChange={(e) => {
                                                        setIsChecked(e.target.checked)
                                                    }} color="primary" />}
                                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={isChecked ? false : true}
                                        >
                                            Sign Up
                                        </Button>
                                        <Grid container justifyContent="flex-end">
                                            <Grid item>
                                                <Link href="/login" variant="body2">
                                                    Already have an account? Sign in
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