import { useEffect, useState } from "react";
import Order from "../../../models/Order";
import { OrderService } from "../../../services/order_service";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

function ShippedOrders() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        OrderService.getShippedOrders().then(res => {
            if (res.status === 200) {
                setOrders(res.data);
            } else {
                console.log(res);
            }
        })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate('/unauthorized');
                }
            })
    }, []);

    return (
        <>
            <h3>Shipped Orders</h3>
            {
                orders?.map((order, index) =>
                    <Paper key={index} elevation={3} sx={{ margin: 2, padding: 2 }}>
                        <h3>{order._id} </h3>
                        <pre className="address">{order.address}</pre>
                        <div className="total">
                            Total: Rs. <b>{order.total}</b>
                        </div>
                        <div>
                            <b>Items</b>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell align="center">Quantity</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.items?.map((item) => (
                                            <TableRow
                                                key={item.item?.code}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {item.item?.name}
                                                </TableCell>
                                                <TableCell align="center">{item.quantity}</TableCell>
                                                <TableCell align="right">Rs. {item.item?.price! * item.quantity!}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Paper>
                )
            }
        </>
    )
}

export default ShippedOrders;