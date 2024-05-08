import { Box, Button, TextField, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { Formik } from 'formik'
import useMediaQuery from '@mui/material/useMediaQuery'
import * as yup from 'yup'
import { useCreateProductMutation } from '../../api/dataApi'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductForm = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const isNonMobile = useMediaQuery("(min-width: 600px)")

    const [createProduct] = useCreateProductMutation()

    const submitValidation = async (values, { resetForm }) => {
        console.log(values);
        const image = values.image

        let imageUrl = ""; // Variable to hold the image URL

        if (image) {
            try {
                // Create a storage reference
                const storageRef = ref(
                    storage,
                    `images/${Math.random()}-${image.name}`
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

        createProduct(
            values
        )

        resetForm()

        if (!values) {
            toast.error("Error occured!");
            return;
        }
        toast.success("Product created successfully");
    }

    return (
        <Box m="20px">
            <Header title="CREATE PRODUCT" subtitle="Create a New Product Item" />

            <Formik
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
                        isSubmitting,
                        setFieldValue
                    }) => (

                        <form onSubmit={handleSubmit}>

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
                                    label="Brand Number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.brandName}
                                    name='brandName'
                                    error={!!touched.brandName && !!errors.brandName}
                                    helperText={touched.brandName && errors.brandName}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type='text'
                                    label="Product Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.productName}
                                    name='productName'
                                    error={!!touched.productName && !!errors.productName}
                                    helperText={touched.productName && errors.productName}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type='text'
                                    label="Description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.description}
                                    name='description'
                                    error={!!touched.description && !!errors.description}
                                    helperText={touched.description && errors.description}
                                    sx={{ gridColumn: "span 4" }}
                                />

                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type='number'
                                    label="Price"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.price}
                                    name='price'
                                    error={!!touched.price && !!errors.price}
                                    helperText={touched.price && errors.price}
                                    sx={{ gridColumn: "span 1" }}
                                />

                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type='number'
                                    label="Qty"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.qty}
                                    name='qty'
                                    error={!!touched.qty && !!errors.qty}
                                    helperText={touched.qty && errors.qty}
                                    sx={{ gridColumn: "span 1" }}
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
                                <Button type='submit' color='secondary' variant='contained' disabled={isSubmitting}>
                                    Create New Product
                                </Button>
                            </Box>
                        </form>
                    )
                }
            </Formik>
        </Box>
    )
}

const checkoutSchema = yup.object().shape({
    brandName: yup.string().required("required"),
    productName: yup.string().required("required"),
    description: yup.string().required("required"),
    price: yup.number().required("required"),
    image: yup.mixed().required("Image is required"),
    qty: yup.number().required("required"),
})

let initialValues = {
    brandName: "",
    productName: "",
    description: "",
    price: "",
    image: "",
    qty: ""
}

export default ProductForm