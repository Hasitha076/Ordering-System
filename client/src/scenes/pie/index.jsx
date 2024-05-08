import { Box, Button, useTheme } from '@mui/material'
import React from 'react'
import Header from '../../components/Header'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { tokens } from '../../theme';
import PieChart from '../../components/PieChart';

const Pie = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="PIE CHART" subtitle="This is the pie chart" />

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
            <Box mt="10px" height="75vh">
                <PieChart />
            </Box>

        </Box>
    )
}

export default Pie