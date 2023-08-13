import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductService } from "../../../services/product_service";
import Product from "../../../models/Product";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { HOST } from "../../../config/globals";
import CardContent from "@mui/material/CardContent";

function SubCategory() {

    const navigate = useNavigate();

    const params = useParams();
    const subcategory = params.subcategory;

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        ProductService.getProductsBySubCategory(subcategory!).then(res => {
            if (res.status == 200) {
                setProducts(res.data);
            } else {

            }
        }).catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="body-container">
            <Paper elevation={3} sx={{ padding: 3, margin: 4 }}>
                <Typography variant="h4" component="h2" mb={3}>
                    {subcategory}
                </Typography>
                <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {products.map((product, index) =>
                        <Grid item xs={2} sm={4} md={3} key={index}>
                            <CardActionArea onClick={() => setTimeout(() => navigate(`/product/${product._id}`), 200)}>
                                <Card>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={`${HOST}/static/${product.images![0]}`}
                                        title={product.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            { product.description!.length > 50 ? `${product.description?.substring(0, 50)}...` : product.description}
                                        </Typography>
                                        <Typography variant="body1" color="text.primary">
                                            Rs. {product.price}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </div>
    );
}

export default SubCategory;