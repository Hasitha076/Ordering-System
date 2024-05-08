import { Box, Button, TextField, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { Formik } from 'formik'
import useMediaQuery from '@mui/material/useMediaQuery'
import * as yup from 'yup'
import { submitValidation } from '../../lib/validation/form/submit-function'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateUserMutation } from '../../api/dataApi'

const UserForm = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const isNonMobile = useMediaQuery("(min-width: 600px)")

    const [createUser] = useCreateUserMutation()

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
        <Box m="20px">
            <Header title="CREATE USER" subtitle="Create a New User Profile" />

            <Formik
                enableReinitialize={true}
                onSubmit={submitValidation}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {
                    ({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue
                    }) => (
                        < form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                    "& .css-1m1f1hj-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                                        color: '#fff'
                                    }
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type='text'
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name='firstName'
                                    error={!!touched.firstName && !!errors.firstName}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type='text'
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name='lastName'
                                    error={!!touched.lastName && !!errors.lastName}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type='text'
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name='email'
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 4" }}
                                />

                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type='password'
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name='password'
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type='password'
                                    label="Re-password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.rePassword}
                                    name='rePassword'
                                    error={!!touched.rePassword && !!errors.rePassword}
                                    helperText={touched.rePassword && errors.rePassword}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type='number'
                                    label="Phone Number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.phoneNumber}
                                    name='phoneNumber'
                                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                    sx={{ gridColumn: "span 2" }}
                                />

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
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type='submit' color='secondary' variant='contained'>
                                    Create New User
                                </Button>
                            </Box>

                        </form>
                    )
                }
            </Formik>
        </Box >
    )
}

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

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    phoneNumber: "",
    image: ""
}

export default UserForm