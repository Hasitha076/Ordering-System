import { Typography, IconButton, Button, Box, useTheme, NativeSelect, InputLabel, FormControl } from '@mui/material';
import React, { useState } from 'react';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useChnageOrderStatusMutation, useDeleteOrderMutation, useGetAllOrdersQuery, useGetOrderQuery } from '../../api/dataApi';

const Order = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [id, setId] = useState()
    const [open, setOpen] = useState(false)
    const [create, setCreate] = useState(false)
    const { data: getAllOrders, isLoading: allOrdersLoading } = useGetAllOrdersQuery()
    const { data: getOrder, isSuccess, isLoading: getOrdersLoading } = useGetOrderQuery(id)
    const [changeStatus] = useChnageOrderStatusMutation()
    const [deleteOrder] = useDeleteOrderMutation()

    const modifiedData = !allOrdersLoading && (getAllOrders !== undefined) ? getAllOrders.response.map(order => ({
        ...order,
        customerName: order.customerDetails.name,
        phoneNumber: order.customerDetails.phoneNumber,
        email: order.customerDetails.email,
    })) : null

    const modifiedSingleData = isSuccess ? ({
        ...getOrder.response,
        name: getOrder.response.customerDetails.name,
        phoneNumber: getOrder.response.customerDetails.phoneNumber,
        email: getOrder.response.customerDetails.email,
        address: getOrder.response.customerDetails.address,
        city: getOrder.response.customerDetails.city,
        zipcode: getOrder.response.customerDetails.zipcode,
        product: getOrder.response.products.map((ele) => ({
            ...ele,
            brandName: ele[0]
        })),
    }) : null

    console.log(getAllOrders);

    const checkoutSchema = yup.object().shape({
        // id: yup.number().required("required"),
        // name: yup.string().required("required"),
        // phoneNumber: yup.number().required("required"),
        // email: yup.string().email("Invalid email").required("required"),
        // address: yup.string().required("required"),
        // city: yup.string().required("required"),
        // zipcode: yup.string().required("required"),
        // totalCost: yup.number().required("required"),
        // brandName: yup.string().required("required"),
        status: yup.string().required("required")
    })

    const handleClose = () => {
        setOpen(false)
        setId()
    }

    const handleClickOpen = (id) => {
        if (id) {
            // setCreate(false)
            setId(id)
        } else {
            setId(null)
            // setCreate(true)
        }
        setOpen(true);

    };

    const deleteOrderFunc = (id) => {
        console.log(id);
        deleteOrder(id)
        setId()
    }


    const submitValidation = (values, actions) => {
        console.log(values);
        setTimeout(() => {


            if (id) {
                changeStatus({
                    id: id,
                    body: values
                })

                setId()

                if (!values) {
                    toast.error("No order selected.");
                    return;
                }
                toast.success("Status updated successfully");
            } else {
                // createCustomer(
                //     values
                // )
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
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: "4px",
        fontSize: "16px",
        outline: "none",
    };



    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: `customerName`,
            headerName: "Customer Name",
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: "date",
            headerName: "Date",
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
            field: "status",
            headerName: "Status",
            flex: 1,
        },
        {
            flex: 0.8,
            display: "flex",
            justifyContent: "center",
            renderCell: ({ row: { _id } }) => {
                return (
                    <Box display='flex' justifyContent='space-between' gap='5px'>
                        <IconButton
                            onClick={() => handleClickOpen(_id)}
                            sx={{
                                backgroundColor: '#ff5b00',
                                borderRadius: '20%'
                            }}>
                            <ReadMoreIcon />
                        </IconButton>

                        <IconButton sx={{
                            backgroundColor: 'red',
                            borderRadius: '20%'
                        }}
                            onClick={() => deleteOrderFunc(_id)}
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
                <Header title="ORDERS" subtitle="Managing the orders" />
                <Box>
                    <Button sx={{
                        backgroundColor: colors.blueAccent[500],
                        color: colors.grey[100],
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '10px 20px'
                    }}
                    // onClick={() => handleClickOpen(null)}
                    >
                        <AddIcon sx={{ mr: "10px" }} />
                        Create New Order
                    </Button>
                </Box>
            </Box>
            <Box
                m="40px 0 0 0"
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
                {allOrdersLoading ? <>Loading...</> : <DataGrid
                    rows={modifiedData || {}}
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
                        minWidth: "500px",
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
                        {id != null ? `Order Details` : `Create New Order`}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Formik
                            enableReinitialize={true}
                            initialValues={modifiedSingleData}
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
                                        <Box sx={{ width: '100%' }}>
                                            <Typography>ID</Typography>
                                            <Typography style={formFieldStyles}>{!getOrdersLoading ? getOrder.response.id : ""}</Typography>
                                            {/* <Field type="number" name="id" style={formFieldStyles} />
                                            {errors.id && touched.id && <Typography color="red">{errors.id}</Typography>} */}
                                        </Box>

                                        <Box sx={{ width: '100%' }}>
                                            <Typography>Date</Typography>
                                            <Typography style={formFieldStyles}>{!getOrdersLoading ? getOrder.response.date : ""}</Typography>
                                            {/* <Field type="text" name="date" style={formFieldStyles} />
                                            {errors.date && touched.date && <Typography color="red">{errors.date}</Typography>} */}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px', textAlign: 'left' }}>
                                        <Box my={2} sx={{ width: '100%' }}>
                                            <Typography>Total Cost</Typography>
                                            <Typography style={formFieldStyles}>{!getOrdersLoading ? getOrder.response.totalCost : ""}</Typography>
                                            {/* <Field type="text" name="totalCost" style={formFieldStyles} />
                                            {errors.totalCost && touched.totalCost && <Typography color="red">{errors.totalCost}</Typography>} */}
                                        </Box>
                                        <Box my={2} sx={{ width: '80%' }}>
                                            <Typography>Status</Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px', textAlign: 'left' }}>
                                                <Field as="select" name="status" style={formFieldStyles}>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Finished">Finished</option>
                                                </Field>
                                                {errors.status && touched.status && <Typography color="red">{errors.status}</Typography>}
                                                <Button variant="contained" color="success" sx={{ color: `${colors.primary[100]}` }} type='submit'>Update</Button>
                                            </Box>
                                        </Box>

                                    </Box>
                                    <Box sx={{ textAlign: 'left' }}>
                                        <Typography m="10px 0" variant='h3'>Customer Details</Typography>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography>Full Name</Typography>
                                            <Typography style={formFieldStyles}>{!getOrdersLoading ? getOrder.response.customerDetails.name : ""}</Typography>
                                            {/* <Field type="text" name="name" style={formFieldStyles} />
                                            {errors.name && touched.name && <Typography color="red">{errors.name}</Typography>} */}
                                        </Box>
                                    </Box>

                                    <Box my={2} sx={{ display: 'flex', justifyContent: 'space-between', gap: '5px', textAlign: 'left' }}>
                                        <Box sx={{ width: '50%' }}>
                                            <Typography>Phone Number</Typography>
                                            <Typography style={formFieldStyles}>{!getOrdersLoading ? getOrder.response.customerDetails.phoneNumber : ""}</Typography>
                                            {/* <Field type="number" name="phoneNumber" style={formFieldStyles} />
                                            {errors.phoneNumber && touched.phoneNumber && <Typography color="red">{errors.phoneNumber}</Typography>} */}
                                        </Box>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography>Email</Typography>
                                            <Typography style={formFieldStyles}>{!getOrdersLoading ? getOrder.response.customerDetails.email : ""}</Typography>
                                            {/* <Field type="email" name="customerDetails.email" style={formFieldStyles} />
                                            {errors.email && touched.email && <Typography color="red">{errors.email}</Typography>} */}
                                        </Box>
                                    </Box>
                                    <Box sx={{ textAlign: 'left' }}>
                                        <Box my={2} sx={{ width: '100%' }}>
                                            <Typography>Address</Typography>
                                            <Typography style={formFieldStyles}>{!getOrdersLoading ? getOrder.response.customerDetails.address : ""}</Typography>
                                            {/* <Field type="text" name="address" style={formFieldStyles} />
                                            {errors.address && touched.address && <Typography color="red">{errors.address}</Typography>} */}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '5px', textAlign: 'left' }}>
                                        <Box my={2} sx={{ width: '100%' }}>
                                            <Typography>City</Typography>
                                            <Typography style={formFieldStyles}>{!getOrdersLoading ? getOrder.response.customerDetails.city : ""}</Typography>
                                            {/* <Field type="text" name="city" style={formFieldStyles} />
                                            {errors.city && touched.city && <Typography color="red">{errors.city}</Typography>} */}
                                        </Box>
                                        <Box my={2} sx={{ width: '100%' }}>
                                            <Typography>Zip Code</Typography>
                                            <Typography style={formFieldStyles}>{!getOrdersLoading ? getOrder.response.customerDetails.zipcode : ""}</Typography>
                                            {/* <Field type="text" name="zipcode" style={formFieldStyles} />
                                            {errors.zipcode && touched.zipcode && <Typography color="red">{errors.zipcode}</Typography>} */}
                                        </Box>
                                    </Box>
                                    <Box sx={{ textAlign: 'left' }}>
                                        <Typography m="10px 0" variant='h3'>Products Detail</Typography>
                                        <Box my={2} sx={{ width: '100%' }}>
                                            <Typography>Selected Products</Typography>
                                            <Field as="select" name="brandName" style={formFieldStyles}>
                                                <option value="">All Products</option>
                                                {getOrder.response.products.map((ele, index) => {
                                                    return (
                                                        <option key={index} value={ele.brandName}>{ele.brandName}</option>
                                                    )
                                                })}
                                            </Field>
                                            {/* {errors.brandName && touched.brandName && <Typography color="red">{errors.brandName}</Typography>} */}
                                        </Box>
                                    </Box>

                                    <Box display="flex" alignItems="center" justifyContent="center" className="dialog-box-buttons" >
                                        <Button variant="contained" color="error" sx={{ color: `${colors.primary[100]}` }} onClick={handleClose}>Cancel</Button>

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
    )
}

export default Order