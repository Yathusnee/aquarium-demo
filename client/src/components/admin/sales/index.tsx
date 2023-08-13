import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

function Sales() {

    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [profit, setProfit] = useState(0);

    useEffect(() => {
        setProfit(income - expenses);
    }, [income, expenses]);

    return (
        <>
            <h3>Sales</h3>
            <Box
                        sx={{ width: '100%', mt: 2 }}
                        component='form'
                        noValidate
                        autoComplete='off'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <TextField
                                            label='Total Income'
                                            fullWidth
                                            required
                                            type="number"
                                            value={income}
                                            onChange={(e) => setIncome(parseInt(e.target.value))}
                                            size='small'
                                        />
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <TextField
                                            label='Expenses'
                                            fullWidth
                                            size='small'
                                            value={expenses}
                                            onChange={(e) => setExpenses(parseInt(e.target.value))}
                                            type="number"
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        {
                                            profit > 0 ? <h1>Profit: Rs. {profit}</h1> : <h1>Lost: Rs. {profit*-1}</h1>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>
        </>
    )
}

export default Sales;