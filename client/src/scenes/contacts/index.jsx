import { Box, IconButton, Button, Typography, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EngineeringIcon from '@mui/icons-material/Engineering';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCreateCustomerMutation, useDeleteCustomerMutation, useGetAllCustomersQuery, useGetCustomerQuery, useUpdateCustomerMutation } from "../../api/dataApi";
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';

const Contacts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [id, setId] = useState()
    const [open, setOpen] = useState(false)
    const [create, setCreate] = useState(false)
    const { data: getAllCustomers, isLoading: allCustomerLoading } = useGetAllCustomersQuery()
    const { data: getCustomer, isSuccess } = useGetCustomerQuery(id)
    const [createCustomer] = useCreateCustomerMutation()
    const [updateCustomer] = useUpdateCustomerMutation()
    const [deleteCustomer] = useDeleteCustomerMutation()

    const checkoutSchema = yup.object().shape({
        regNumber: yup.number().required("required"),
        name: yup.string().required("required"),
        age: yup.number().required("required"),
        phoneNumber: yup.number().required("required"),
        email: yup.string().email("Invalid email").required("required"),
        address: yup.string().required("required"),
        city: yup.string().required("required"),
        zipcode: yup.string().required("required")
    })

    const handleClose = () => {
        setOpen(false)
    }

    const handleClickOpen = (id) => {
        if (id) {
            setCreate(false)
            setId(id)
        } else {
            setId(null)
            setCreate(true)
        }
        setOpen(true);

    };

    const deleteCustomerFunc = (id) => {
        deleteCustomer(id)
    }

    const submitValidation = (values, actions) => {
        console.log(values);
        setTimeout(() => {


            if (id) {
                updateCustomer({
                    id: id,
                    body: values
                })

                if (!values) {
                    toast.error("No user selected.");
                    return;
                }
                toast.success("User updated successfully");
            } else {
                createCustomer(
                    values
                )
                if (!values) {
                    toast.error("No user selected.");
                    return;
                }
                toast.success("User created successfully");
            }

        }, 1000);
        setOpen(false);
    }

    const formFieldStyles = {
        width: "100%",
        height: "40px",
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
        outline: "none",
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "regNumber", headerName: "Registrar ID" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1,
        },
        {
            field: "city",
            headerName: "City",
            flex: 1,
        },
        {
            field: "zipcode",
            headerName: "Zip Code",
            flex: 1,
        },
        {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            renderCell: ({ row: { _id } }) => {
                return (
                    <Box display='flex' justifyContent='space-between' gap='5px'>
                        <IconButton onClick={() => handleClickOpen(_id)} sx={{
                            backgroundColor: '#ff5b00',
                            borderRadius: '20%'
                        }}>
                            <EngineeringIcon />
                        </IconButton>

                        <IconButton sx={{
                            backgroundColor: 'red',
                            borderRadius: '20%'
                        }}
                            onClick={() => deleteCustomerFunc(_id)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                )
            }
        }
    ];

    return (
        <Box m="20px">
            <Box display='flex' justifyContent="space-between" alignItems="center">
                <Header
                    title="CONTACTS"
                    subtitle="List of Contacts for Future Reference"
                />

                <Box>
                    <Button sx={{
                        backgroundColor: colors.blueAccent[500],
                        color: colors.grey[100],
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '10px 20px'
                    }} onClick={() => handleClickOpen(null)}>
                        <PersonAddAltIcon sx={{ mr: "10px" }} />
                        Create New Customer
                    </Button>
                </Box>
            </Box>

            <Box
                m="10px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                    "& .css-1d5ppn7-MuiDataGrid-root .MuiDataGrid-container--top [role=row], .css-1d5ppn7-MuiDataGrid-root .MuiDataGrid-container--bottom [role=row]": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    }
                }}
            >
                {allCustomerLoading ? <>Loading...</> :
                    <DataGrid
                        rows={getAllCustomers.result}
                        columns={columns}
                        slots={{ toolbar: GridToolbar }}
                    />}
            </Box>

            {(isSuccess || create) ? <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    "& .css-1qxadfk-MuiPaper-root-MuiDialog-paper": {
                        maxWidth: "500px",
                        padding: "20px 20px"
                    },
                    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                        padding: "20px 20px"
                    },
                    "& .css-1153z2v-MuiTypography-root-MuiDialogTitle-root": {
                        padding: "16px 0",
                        textAlign: "center"
                    },
                    "& .css-ypiqx9-MuiDialogContent-root": {
                        padding: "20px 0",
                        textAlign: "center"
                    },
                    "& .css-1ap71sy-MuiDialogActions-root": {
                        padding: "5px 0"
                    },
                    "& .css-1ptyyyq-MuiFormLabel-root-MuiInputLabel-root": {
                        color: `${colors.primary[100]}`
                    },
                    "& .css-75gcxd-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                        color: `${colors.primary[100]}`
                    },
                    "& .css-wxl1jl-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: `${colors.primary[200]}`
                    },
                    "& .css-y3n1jv-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: `${colors.primary[200]}`
                    },
                    "& .css-1uihlk4": {
                        marginTop: "5px",
                        marginBottom: "5px",
                        textAlign: "left"
                    }
                }}
            >
                <DialogTitle>
                    <Typography variant='h2' color={colors.grey[100]}>
                        {id != null ? `Edit Customer Details` : `Create New Customer`}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Formik
                            enableReinitialize={true}
                            initialValues={id != null ? getCustomer.response : {
                                regNumber: '',
                                ClassNames: '',
                                age: '',
                                email: '',
                                phoneNumber: '',
                                address: '',
                                city: '',
                                zipcode: '',
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
                                <Form onSubmit={handleSubmit}>
                                    <Box my={2} sx={{ display: 'flex', justifyContent: 'space-between', gap: '5px', textAlign: 'left' }}>
                                        <Box sx={{ width: '40%' }}>
                                            <Typography>Register Number</Typography>
                                            <Field type="text" name="regNumber" style={formFieldStyles} />
                                            {errors.regNumber && touched.regNumber && <Typography color="red">{errors.regNumber}</Typography>}
                                        </Box>

                                        <Box sx={{ width: '100%' }}>
                                            <Typography>Full Name</Typography>
                                            <Field type="text" name="name" style={formFieldStyles} />
                                            {errors.name && touched.name && <Typography color="red">{errors.name}</Typography>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ textAlign: 'left' }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography>Phone Number</Typography>
                                            <Field type="number" name="phoneNumber" style={formFieldStyles} />
                                            {errors.phoneNumber && touched.phoneNumber && <Typography color="red">{errors.phoneNumber}</Typography>}
                                        </Box>
                                    </Box>

                                    <Box my={2} sx={{ display: 'flex', justifyContent: 'space-between', gap: '5px', textAlign: 'left' }}>
                                        <Box sx={{ width: '40%' }}>
                                            <Typography>Age</Typography>
                                            <Field type="number" name="age" style={formFieldStyles} />
                                            {errors.age && touched.age && <Typography color="red">{errors.age}</Typography>}
                                        </Box>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography>Email</Typography>
                                            <Field type="email" name="email" style={formFieldStyles} />
                                            {errors.email && touched.email && <Typography color="red">{errors.email}</Typography>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ textAlign: 'left' }}>
                                        <Box my={2} sx={{ width: '100%' }}>
                                            <Typography>Address</Typography>
                                            <Field type="text" name="address" style={formFieldStyles} />
                                            {errors.address && touched.address && <Typography color="red">{errors.address}</Typography>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '5px', textAlign: 'left' }}>
                                        <Box my={2} sx={{ width: '100%' }}>
                                            <Typography>City</Typography>
                                            <Field type="text" name="city" style={formFieldStyles} />
                                            {errors.city && touched.city && <Typography color="red">{errors.city}</Typography>}
                                        </Box>
                                        <Box my={2} sx={{ width: '100%' }}>
                                            <Typography>Zip Code</Typography>
                                            <Field type="text" name="zipcode" style={formFieldStyles} />
                                            {errors.zipcode && touched.zipcode && <Typography color="red">{errors.zipcode}</Typography>}
                                        </Box>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" className="dialog-box-buttons" >
                                        <Button variant="contained" color="error" sx={{ color: `${colors.primary[100]}` }} onClick={handleClose}>Cancel</Button>
                                        {!create ? <Button variant="contained" color="success" sx={{ color: `${colors.primary[100]}` }} type='submit'>Update</Button> : <Button variant="contained" color="success" sx={{ color: `${colors.primary[100]}` }} type='submit'>Create</Button>}
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                </DialogActions>
            </Dialog> : null}
        </Box>
    );
};

export default Contacts;
