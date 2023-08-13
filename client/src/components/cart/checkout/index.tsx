import { useEffect, useState } from "react";
import CheckoutModel from "../../../models/CheckoutModel";
import { CartService } from "../../../services/cart_service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import './checkout.css';
import { Paper } from "@mui/material";
import { OrderService } from "../../../services/order_service";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../snackbar/snackbar";

function Checkout() {

    const navigate = useNavigate();

    const [checkout, setCheckout] = useState(new CheckoutModel())
    const [loading, setLoading] = useState(true);

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
        CartService.checkout().then(res => {
            if (res.status === 200) {
                setCheckout(res.data);
                setLoading(false);
            } else {
                console.log(res);
            }
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const placeOrder = (e: any) => {
        setLoading(true);
        e.preventDefault();
        OrderService.placeOrder().then(res => {
            if (res.status === 200) {
                openSuccessSnackbar("Order placed successfully!");
                setTimeout(() => navigate('/'), 2000);
            }
        }).catch(err => {
            console.log(err);
            if (err.response.data.message) {
                openErrorSnackbar(`Login failed : ${err.response.data.message}`);
            } else {
                openErrorSnackbar(`Login failed : ${err.message}`);
            }
            setLoading(false);
        })
    }

    return (
        <div className="body-container checkout">
            <CustomSnackbar {...snackbar} open={open} setOpen={setOpen} />
            <Paper elevation={3} sx={{ padding: 3, margin: 3, maxWidth: '50%', minWidth: '50%' }}>
                <Box
                    component="div"
                >
                    <form method="post" action="https://sandbox.payhere.lk/pay/checkout">
                        <input type="hidden" name="merchant_id" value="1223542" />
                        <input type="hidden" name="return_url" value="http://akurukb.com/return" />
                        <input type="hidden" name="cancel_url" value="http://akurukb.com/cancel" />
                        <input type="hidden" name="notify_url" value="http://akurukb.com/notify" />
                        <input type="hidden" name="last_name" value="gett" />
                        <input type="hidden" name="hash" value={checkout.hash} />
                        <table className="order-details">
                            <tbody>
                                <tr>
                                    <td>Order Reference</td>
                                    <td>
                                        <TextField
                                            className="text"
                                            size="small"
                                            value={checkout.order}
                                            disabled
                                            name="order_id"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Items</td>
                                    <td>
                                        <TextField
                                            className="text"
                                            size="small"
                                            name="items"
                                            value={checkout.items?.join(', ')}
                                            disabled
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Currency</td>
                                    <td>
                                        <TextField
                                            className="text"
                                            size="small"
                                            name="currency"
                                            value="LKR"
                                            disabled
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Amount</td>
                                    <td>
                                        <TextField
                                            className="text"
                                            size="small"
                                            name="amount"
                                            value={checkout.total}
                                            disabled
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Customer Name</td>
                                    <td>
                                        <TextField
                                            className="text"
                                            size="small"
                                            name="first_name"
                                            value={checkout.firstname}
                                            disabled
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <TextField
                                            className="text"
                                            size="small"
                                            name="email"
                                            value={checkout.email}
                                            disabled
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>
                                        <TextField
                                            className="text"
                                            size="small"
                                            name="phone"
                                            value={checkout.phone}
                                            disabled
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>
                                        <TextField
                                            className="text"
                                            size="small"
                                            name="address"
                                            value={checkout.address}
                                            disabled
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>
                                        <TextField
                                            className="text"
                                            size="small"
                                            name="city"
                                            value={checkout.city}
                                            disabled
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Country</td>
                                    <td>
                                        <TextField
                                            className="text"
                                            size="small"
                                            name="country"
                                            value={checkout.country}
                                            disabled
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <LoadingButton onClick={placeOrder} fullWidth type="submit" loading={loading} variant="contained">
                                            Buy Now
                                        </LoadingButton>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </Box>
            </Paper>
        </div >
    )
}

export default Checkout;