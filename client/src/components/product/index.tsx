import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductService } from "../../services/product_service";
import ProductModel from "../../models/Product";
import Paper from "@mui/material/Paper";
import './product.css';
import { CATEGORIES, HOST } from "../../config/globals";
import Typography from "@mui/material/Typography";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button, Chip, IconButton } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ImageGallery from 'react-image-gallery';
import CustomSnackbar from "../snackbar/snackbar";
import { CartService } from "../../services/cart_service";
import { LoadingButton } from "@mui/lab";

function Product() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const [product, setProduct] = useState(new ProductModel());
    const [quantity, setQuantity] = useState(1);
    const [images, setImages] = useState<any>([]);

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        severity: 'success', message: ''
    })

    const openSuccessSnackbar = (message: string) => {
        setSnackbar({
            severity: 'success',
            'message': message
        });
        setOpen(true);
    }

    const openErrorSnackbar = (message: string) => {
        setSnackbar({
            severity: 'error',
            'message': message
        });
        setOpen(true);
    }

    useEffect(() => {
        ProductService.getProduct(id!).then(res => {
            if (res.status === 200) {
                setProduct(res.data);

                const imgs: any[] = [];
                res.data.images?.forEach(item => {
                    imgs.push({
                        original: `${HOST}/static/${item}`,
                        thumbnail: `${HOST}/static/${item}`
                    });
                });
                setImages(imgs);
            } else {

            }
        })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const addQuantity = () => {
        setQuantity((prev) => prev + 1);
    }

    const removeQuantity = () => {
        setQuantity((prev) => prev > 1 ? prev - 1 : 1);
    }

    const addToCart = () => {
        CartService.addToCart(product._id!, quantity).then(res => {
            if (res.status === 200) {
                openSuccessSnackbar("Item added to the cart.");
                setLoading(false);
            } else {
                openErrorSnackbar(`Faileddd : ${res.statusText}`);
                setLoading(false);
            }
        })
        .catch(err => {
            if (err.response.status === 401) {
                openErrorSnackbar(`Please login or create an account!`);
                setLoading(false);
                setTimeout(() => {
                    navigate('/login');
                }, 1000)
                return;
            }

            if (err.response.data.message) {
                openErrorSnackbar(`Failed : ${err.response.data.message}`);
            } else {
                openErrorSnackbar(`Failed : ${err.message}`);
            }
            setLoading(false);
        });
    }

    return (
        <div className="body-container">
            <CustomSnackbar {...snackbar} open={open} setOpen={setOpen} />
            <Paper elevation={3} sx={{ margin: 4, padding: 3, display: 'flex', alignItems: 'center' }}>
                <div className="product-container">
                    <div className="left-side">
                        <ImageGallery items={images} />
                    </div>
                    <div className="right-side">
                        <Chip color="primary" icon={<WaterDropIcon />} label={CATEGORIES[product.category!]} />
                        <h1 className="product-title"> {product.name} </h1>
                        <Typography gutterBottom variant="h5" component="h3">
                            Rs. {product.price}
                        </Typography>
                        <p className="shipping-text">Shipping calulcated at checkout.</p>
                        <p className="quantity-text">Quantity</p>
                        <div className="quantity-picker">
                            <IconButton onClick={removeQuantity}><RemoveIcon /></IconButton >
                            <div>
                                {quantity}
                            </div>
                            <IconButton onClick={addQuantity}><AddIcon /></IconButton >
                        </div>
                        <LoadingButton onClick={addToCart} loading={loading} variant="outlined" startIcon={<AddShoppingCartIcon />} sx={{ height: '3rem', width: '20rem' }}>
                            Add to cart
                        </LoadingButton>
                        <Button variant="contained" color="secondary" startIcon={<FavoriteIcon />} sx={{ height: '3rem', width: '15rem', ml: 2 }}>
                            Add to wishlist
                        </Button>
                        <Typography gutterBottom variant="h6" component="h3" sx={{ mt: 5, mb: 2 }}>
                            {product.name}
                        </Typography>
                        <p>
                            {product.description}
                        </p>
                        <table className="fish-details-table">
                            <tbody>
                                <tr>
                                    <td className="table-item"> Sciencetific Name : </td>
                                    <td><b> {product.sciencetific} </b></td>
                                </tr>
                                <tr>
                                    <td className="table-item"> Temperature : </td>
                                    <td><b> {product.temperature} </b></td>
                                </tr>
                                <tr>
                                    <td className="table-item"> PH Value : </td>
                                    <td><b> {product.ph} </b></td>
                                </tr>
                                <tr>
                                    <td className="table-item"> Behaviour : </td>
                                    <td><b> {product.behaviour} </b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default Product;