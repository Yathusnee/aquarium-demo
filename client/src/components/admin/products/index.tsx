import { useEffect, useState } from "react";
import Product from "../../../models/Product";
import { ProductService } from "../../../services/product_service";
import { Button, Fab, Paper } from "@mui/material";
import { HOST } from "../../../config/globals";
import './products.css';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

function AdminProducts() {

    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        ProductService.getAllProducts().then(res => {
            if (res.status === 200) {
                setProducts(res.data);
            }
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <>
            {
                products.map((product, index) =>
                    <Paper key={index} className="product-paper">
                        <div className="product-image-container">
                            <img src={`${HOST}/static/${product.images![0]}`} alt={product.name} />
                        </div>
                        <div>
                            <h2>{product.name}</h2>
                            <p>Code: {product.code}</p>
                            <p>{product.category} water</p>
                            <h3>Rs. {product.price}</h3>
                        </div>
                        <div>
                            <Button onClick={() => navigate(`/admin/add-product/${product._id}`)}>Edit</Button>
                        </div>
                    </Paper>
                )
            }
            <Fab onClick={() => navigate('/admin/add-product')} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </>
    )
}

export default AdminProducts;