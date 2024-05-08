
import { Box, IconButton, Button, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateTeamMutation, useDeleteTeamMutation, useGetAllTeamQuery, useGetTeamQuery, useUpdateTeamMutation } from '../../api/dataApi';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Team = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [id, setId] = useState()
    const [create, setCreate] = useState(false)
    const { data: getAllTeam, isLoading: getAllTeamLoading, isFetching } = useGetAllTeamQuery()
    const { data: getTeam, isLoading: getTeamLoading, isSuccess } = useGetTeamQuery(id)
    const [updateDataById] = useUpdateTeamMutation()
    const [createTeam] = useCreateTeamMutation()
    const [deleteTeam] = useDeleteTeamMutation()

    const checkoutSchema = yup.object().shape({
        id: yup.number().required("required"),
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        age: yup.number().required("required"),
        phoneNumber: yup.number().required("required"),
        email: yup.string().email("Invalid email").required("required"),
        level: yup.string().required("required")
    })

    if (!getAllTeamLoading) {
        console.log("Data: ", getAllTeam.result);
    }

    console.log("getTeam: ", getTeam);


    const [open, setOpen] = useState(false);


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

    const deleteTeamMember = (id) => {
        deleteTeam(id)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const submitValidation = (values, actions) => {
        setTimeout(() => {

            if (id) {
                updateDataById({
                    id: id,
                    body: values
                })

                if (!values) {
                    toast.error("No user selected.");
                    return;
                }
                toast.success("User updated successfully");
            } else {
                createTeam(
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
        {
            field: "id",
            headerName: "ID"
        },
        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },

        {
            field: "lastName",
            headerName: "Last Name",
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
            field: "level",
            headerName: "Access Level",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            renderCell: ({ row: { level, _id } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        sx={{ cursor: "pointer" }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor={
                            level === "Admin"
                                ? colors.greenAccent[600]
                                : level === "Manager"
                                    ? colors.greenAccent[700]
                                    : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                        onClick={() => handleClickOpen(_id)}
                    >
                        {level === "Admin" && <AdminPanelSettingsIcon />}
                        {level === "Manager" && <SecurityIcon />}
                        {level === "Member" && <LockOpenIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {level}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            display: "flex",
            justifyContent: "center",
            renderCell: ({ row: { _id } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        sx={{ cursor: "pointer" }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        onClick={() => deleteTeamMember(_id)}
                    >
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )
            }
        }
    ]

    return (
        <Box m="20px">
            <Box display='flex' justifyContent="space-between" alignItems="center">
                <Header title="TEAM" subtitle="Managing the Team Members" />
                <Box>
                    <Button sx={{
                        backgroundColor: colors.blueAccent[500],
                        color: colors.grey[100],
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '10px 20px'
                    }} onClick={() => handleClickOpen(null)}>
                        <PersonAddAltIcon sx={{ mr: "10px" }} />
                        Create Team Member
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
                {getAllTeamLoading ? <>Loading...</> : <DataGrid rows={getAllTeam.result} columns={columns} slots={{ toolbar: GridToolbar }} />}
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
                        {id != null ? `Edit Member Details` : `Create New Member`}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Formik
                            enableReinitialize={true}
                            initialValues={id != null ? getTeam.result : {
                                id: '',
                                firstName: '',
                                lastName: '',
                                age: '',
                                email: '',
                                phoneNumber: '',
                                level: ''
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
                                        <Box sx={{ width: '100%' }}>
                                            <Typography>First Name</Typography>
                                            <Field type="text" name="firstName" style={formFieldStyles} />
                                            {errors.firstName && touched.firstName && <Typography color="red">{errors.firstName}</Typography>}
                                        </Box>

                                        <Box sx={{ width: '100%' }}>
                                            <Typography>Last Name</Typography>
                                            <Field type="text" name="lastName" style={formFieldStyles} />
                                            {errors.lastName && touched.lastName && <Typography color="red">{errors.lastName}</Typography>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '5px', textAlign: 'left' }}>
                                        {create ?
                                            <Box sx={{ width: '100%' }}>
                                                <Typography>ID</Typography>
                                                <Field type="number" name="id" style={formFieldStyles} />
                                                {errors.id && touched.id && <Typography color="red">{errors.id}</Typography>}
                                            </Box>
                                            : null}

                                        <Box sx={{ width: '100%' }}>
                                            <Typography>Age</Typography>
                                            <Field type="number" name="age" style={formFieldStyles} />
                                            {errors.age && touched.age && <Typography color="red">{errors.age}</Typography>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ textAlign: 'left' }}>
                                        <Box my={2} sx={{ width: '100%' }}>
                                            <Typography>Email</Typography>
                                            <Field type="email" name="email" style={formFieldStyles} />
                                            {errors.email && touched.email && <Typography color="red">{errors.email}</Typography>}
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '5px', textAlign: 'left' }}>
                                        <Box my={2} sx={{ width: '100%' }}>
                                            <Typography>Phone Number</Typography>
                                            <Field type="number" name="phoneNumber" style={formFieldStyles} />
                                            {errors.phoneNumber && touched.phoneNumber && <Typography color="red">{errors.phoneNumber}</Typography>}
                                        </Box>
                                        <Box my={2} sx={{ width: '100%' }}>
                                            <Typography>Access Level</Typography>
                                            <Field as="select" name="level" style={formFieldStyles}>
                                                <option value="">Select Access Level</option>
                                                <option value="Manager">Manager</option>
                                                <option value="Member">Member</option>
                                                <option value="Admin">Admin</option>
                                            </Field>
                                            {errors.level && touched.level && <Typography color="red">{errors.level}</Typography>}
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

        </Box >

    )
}

export default Team