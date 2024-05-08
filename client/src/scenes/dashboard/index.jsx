import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import Header from '../../components/Header'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import PeopleIcon from '@mui/icons-material/People';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import { tokens } from '../../theme';
import Card from '../../components/Card';
import LineChart from '../../components/LineChart';
import { mockTransactions } from '../../data/mockData'
import { useCountCustomersQuery, useCountOrdersQuery, useCountProductsQuery, useGetAllOrdersQuery, useTotalIncomeQuery } from '../../api/dataApi';

const Dashboard = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const { data: countProducts } = useCountProductsQuery()
    const { data: countCustomers } = useCountCustomersQuery()
    const { data: countOrder } = useCountOrdersQuery()
    const { data: totalIncome } = useTotalIncomeQuery()
    const { data: allOrders, isLoading: loadingOrder } = useGetAllOrdersQuery()


    console.log("product", countProducts);
    console.log("customer", countCustomers);
    console.log("order", countOrder);


    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

                <Box>
                    <Button sx={{
                        backgroundColor: colors.blueAccent[500],
                        color: colors.grey[100],
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '10px 20px'
                    }}>
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </Box>
            <Box
                display='grid'
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW-1 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="10px"
                    boxShadow="0 3px 6px rgba(0, 0, 0, 0.3)"
                >
                    <Card
                        title={countProducts === undefined ? 0 : countProducts.result}
                        subtitle="Products"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <AssignmentOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "35px" }} />
                        }
                    />
                </Box>

                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="10px"
                    boxShadow="0 3px 6px rgba(0, 0, 0, 0.3)"
                >
                    <Card
                        title={countOrder === undefined ? 0 : countOrder.result}
                        subtitle="Orders"
                        progress="0.55"
                        increase="+8%"
                        icon={
                            <DeliveryDiningOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "35px" }} />
                        }
                    />
                </Box>

                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="10px"
                    boxShadow="0 3px 6px rgba(0, 0, 0, 0.3)"
                >
                    <Card
                        title={countCustomers === undefined ? 0 : countCustomers.result}
                        subtitle="Customers"
                        progress="0.65"
                        increase="+24%"
                        icon={
                            <PeopleIcon sx={{ color: colors.greenAccent[600], fontSize: "35px" }} />
                        }
                    />
                </Box>

                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="10px"
                    boxShadow="0 3px 6px rgba(0, 0, 0, 0.3)"
                >
                    <Card
                        title={totalIncome === undefined ? 0 : totalIncome.totalIncome}
                        subtitle="Total Income"
                        progress="0.85"
                        increase="+44%"
                        icon={
                            <SavingsOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "35px" }} />
                        }
                    />
                </Box>

                {/* ROW-2 */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    boxShadow="0 3px 6px rgba(0, 0, 0, 0.3)"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt="25px"
                        p="0 30px"
                    >
                        <Box>
                            <Typography variant='h5' fontWeight="600" color={colors.grey[100]}>
                                Revenue Generated
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color={colors.greenAccent[500]}
                            >
                                $59,342.32
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton>
                                <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box height="250px">
                        <LineChart isDashboard={true} />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    overflow="auto"
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    boxShadow="0 3px 6px rgba(0, 0, 0, 0.3)"
                >
                    <Box
                        display='flex'
                        justifyContent="space-between"
                        alignItems="center"
                        color={colors.grey[100]}
                        // borderBottom={`4px solid ${colors.primary[500]}`}
                        p="15px"
                    >
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Recent Orders
                        </Typography>
                    </Box>
                    {!loadingOrder ? allOrders.response?.map((transaction, index) => {
                        return (
                            <Box
                                key={index}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                p="15px"
                                gap="5px"
                                borderTop={`4px solid ${colors.primary[500]}`}
                            >
                                <Box>
                                    {/* <Typography
                                        variant='h5'
                                        color={colors.greenAccent[500]}
                                        fontWeight="600"
                                    >
                                        {transaction.txId}
                                    </Typography> */}
                                    <Typography sx={{ color: colors.greenAccent[500] }}>
                                        {transaction.customerDetails.name}
                                    </Typography>
                                </Box>
                                <Box color={colors.grey[100]}>{transaction.date}</Box>
                                <Box
                                    backgroundColor={colors.greenAccent[500]}
                                    p="5px 10px"
                                    borderRadius="4px"
                                >
                                    ${transaction.totalCost}
                                </Box>
                            </Box>
                        )
                    }) : <Box>
                        <Typography sx={{ color: colors.greenAccent[500], display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            Loading...
                        </Typography>
                    </Box>}
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard