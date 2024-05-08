import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Button } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { useGetAllProductsQuery } from '../../api/dataApi';
import { Link } from 'react-router-dom';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Products = () => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [expanded, setExpanded] = React.useState(false);

    const { data: getAllProducts, isLoading: allProductsLoading } = useGetAllProductsQuery()
    console.log("Products: ", getAllProducts);

    return (

        <Box m="20px">
            <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="PRODUCTS" subtitle="List the all products" />
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
                            Create New Product
                        </Button>
                    </Box>
                </Box>


                <Box
                    m="10px 0 0 0"
                    display='grid'
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="auto"
                    gap="20px"
                >

                    {/* ROW-1 */}
                    {allProductsLoading ? <>Loading...</> : getAllProducts.response.map((item, index) => {
                        return (
                            <Box key={index}
                                gridColumn="span 3"
                                backgroundColor={colors.primary[400]}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                borderRadius="10px"
                            // boxShadow="0 3px 6px rgba(0, 0, 0, 0.3)"
                            >
                                <Card>

                                    <CardMedia
                                        component="img"
                                        // height="194"
                                        image={item.image}
                                        alt="Paella dish"
                                    />
                                    <CardContent sx={{
                                        minHeight: '70px'
                                    }}>
                                        <Typography variant="h3" component="div" color={colors.greenAccent[400]}>
                                            {item.productName}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.brandName}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div" sx={{
                                            backgroundColor: colors.greenAccent[400],
                                            color: colors.grey[700],
                                            display: "inline-block",
                                            padding: "1px 5px"
                                        }}>
                                            Rs. {item.unitPrice}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton>

                                        <ExpandMore>
                                            <BorderColorIcon />
                                        </ExpandMore>
                                    </CardActions>
                                </Card>
                            </Box>
                        )
                    })}

                </Box>


            </Box>
        </Box>

    );
}

export default Products