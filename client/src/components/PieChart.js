import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { ResponsivePie } from '@nivo/pie'
import { useGetAllProductsQuery } from '../api/dataApi'
import { tokens } from '../theme'

const PieChart = ({ isDashboard = false }) => {

    const { data, isLoading } = useGetAllProductsQuery()
    console.log("products:", data);
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    if (!data || isLoading) return "Loading..."

    const color = [
        colors.greenAccent[600],
        colors.redAccent[300],
        colors.redAccent[700],
        colors.blueAccent[600],
        colors.greenAccent[300],
    ]

    const formattedData = data.response.map((
        { productName, unitPrice }, index) => ({
            id: productName,
            label: productName,
            value: unitPrice,
            color: color[index]
        })
    )

    return (
        <Box
            height={isDashboard ? "400px" : "100%"}
            width={undefined}
            minHeight={isDashboard ? "325px" : undefined}
            minWidth={isDashboard ? "325px" : undefined}
            position="relative"
        >
            <ResponsivePie
                data={formattedData}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: colors.grey[300],
                            },
                        },
                        legend: {
                            text: {
                                fill: colors.grey[300],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: colors.grey[300],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: colors.grey[300],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: colors.grey[300],
                        },
                    },
                    tooltip: {
                        container: {
                            color: colors.grey[300],
                        },
                    },
                }}
                colors={{ datum: "data.color" }}
                margin={isDashboard ? { top: 40, right: 80, bottom: 100, left: 50 } : { top: 40, right: 80, bottom: 80, left: 80 }}
                sortByValue={true}
                innerRadius={0.45}
                padAngle={0.7}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                enableArcLinkLabels={!isDashboard}
                arcLinkLabelsTextColor={colors.grey[300]}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}

                fill={[
                    {
                        match: {
                            id: 'ruby'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'c'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'go'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'python'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'scala'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'lisp'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'elixir'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'javascript'
                        },
                        id: 'lines'
                    }
                ]}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: isDashboard ? 20 : 0,
                        translateY: isDashboard ? 50 : 56,
                        itemsSpacing: 0,
                        itemWidth: 85,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: theme.palette.primary[500]
                                }
                            }
                        ]
                    }
                ]}
            />
            <Box
                position="absolute"
                top="50%"
                left="50%"
                color={theme.palette.secondary[400]}
                textAlign="center"
                pointerEvent="none"
                sx={{
                    transform: isDashboard
                        ? "translate(-75%, -170%)"
                        : "translate(-50%, -100%)"
                }} >
                <Typography variant='h6'>
                    {!isDashboard && "total:"} ${data.yearlySalesTotal}
                </Typography>
            </Box>
        </Box>
    )
}

export default PieChart