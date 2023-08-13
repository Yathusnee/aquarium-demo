import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import './cart.css';
import { useEffect, useState } from "react";
import { CartService } from "../../services/cart_service";
import { useNavigate } from "react-router-dom";
import { HOST } from "../../config/globals";
import CartItemDTO from "../../models/CartItemDTO";
import { Button } from "@mui/material";
import { UserService } from "../../services/user_service";

function Cart() {

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItemDTO[]>([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState('');

    useEffect(() => {
        CartService.getCartItems().then(res => {
            if (res.status === 200) {
                setCartItems(res.data);
                let tot = 0;
                for (let i in res.data) {
                    tot += res.data[i].quantity! * res.data[i].item?.price!;
                }
                setTotal(tot);
            }
        }).catch(err => {
            console.log(err);
            navigate('/login');
        });

        UserService.getUserAddress().then(res => {
            if (res.status === 200) {
                setAddress(res.data.address);
            }
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const checkout = () => {
        navigate('/checkout');
    }

    return (
        <div className="body-container">
            <div className="cart-container">
                {
                    cartItems.length ? <>
                        <Typography gutterBottom variant="h5" component="h3">
                            Your Cart
                        </Typography>
                        <div className="cart-container-items-totals">
                            <div className="cart-items-container">
                                <table className="items-table">
                                    <thead>
                                        <th></th>
                                        <th></th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItems.map((item, index) =>
                                                <tr key={index}>
                                                    <td className="image">
                                                        <img className="cart-item-img" src={`${HOST}/static/${item.item?.images![0]}`} />
                                                    </td>
                                                    <td>
                                                        <h2>{item.item?.name}</h2>
                                                        <p>Rs. {item.item?.price}</p>
                                                    </td>
                                                    <td className="quantity">
                                                        <p>{item.quantity}</p>
                                                    </td>
                                                    <td>
                                                        <p>Rs. {item.quantity! * item.item?.price!}</p>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="cart-totals-container">
                                <Paper elevation={2} sx={{ padding: 2 }}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><b>Net Total</b></td>
                                                <td>
                                                    <Typography variant="h6" component="h3">
                                                        Rs. {total}
                                                    </Typography>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Shipping</td>
                                                <td>
                                                    <Typography variant="h6" component="h3">
                                                        Rs. 0.00
                                                    </Typography>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Tax</td>
                                                <td>
                                                    <Typography variant="h6" component="h3">
                                                        Rs. 0.00
                                                    </Typography>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Typography gutterBottom variant="h6" component="h3">
                                                        Grand Total
                                                    </Typography>
                                                </td>
                                                <td>
                                                    <Typography gutterBottom variant="h5" component="h3">
                                                        Rs. {total}
                                                    </Typography>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <div className="address-container">
                                                        <hr />
                                                        <b>Delivery Address</b>
                                                        <pre>
                                                            { address }
                                                        </pre>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <Button onClick={checkout} fullWidth variant="contained" color="primary" sx={{ width: '100%' }}>
                                                        Goto Checkout
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Paper>
                            </div>
                        </div>
                    </> : <Typography gutterBottom variant="h5" component="h3">
                        Cart is empty
                    </Typography>
                }
            </div>
        </div>
    )
}

export default Cart;