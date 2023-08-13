import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField/TextField";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { UserService } from "../../../../../services/user_service";
import User from "../../../../../models/User";
import CustomSnackbar from "../../../../snackbar/snackbar";
import { useNavigate } from "react-router-dom";

function AddEditEmployeeForm(props: any) {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        points: 0,
        customer: false,
        employee: false,
        admin: false,
        receptionist: false,
        owner: false
    });

    const [loading, setLoading] = useState(false);
    const [passwordEnable, setPasswordEnable] = useState(true);
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

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const reset = () => {
        setValues({
            name: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            address: '',
            points: 0,
            customer: false,
            employee: false,
            admin: false,
            receptionist: false,
            owner: false
        });
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();

        if (props.employee === undefined) {
            let userObject = values as unknown as User;
            userObject.roles = [];
            if (values.customer) {
                userObject.roles.push('customer');
            }
            if (values.admin) {
                userObject.roles.push('admin');
            }
            if (values.owner) {
                userObject.roles.push('owner');
            }
            if (values.employee) {
                userObject.roles.push('employee');
            }
            if (values.receptionist) {
                userObject.roles.push('receptionist');
            }

            UserService.addUser(userObject).then(res => {
                openSuccessSnackbar("User added!");
                reset();
                setLoading(false);
            }).catch(err => {
                if (err.response.data.message) {
                    openErrorSnackbar(`Error: ${err.response.data.message}`);
                } else {
                    openErrorSnackbar(`Error: ${err.message}`);
                }
                setLoading(false);
            });
        } else {
            let userObject = new User(values.username, values.name, undefined, values.email, values.address, values.phone);
            userObject.points = values.points;
            userObject._id = props.employee._id;
            userObject.roles = [];
            if (values.customer) {
                userObject.roles.push('customer');
            }
            if (values.admin) {
                userObject.roles.push('admin');
            }
            if (values.owner) {
                userObject.roles.push('owner');
            }
            if (values.employee) {
                userObject.roles.push('employee');
            }
            if (values.receptionist) {
                userObject.roles.push('receptionist');
            }

            UserService.updateUser(userObject).then(res => {
                openSuccessSnackbar("User added!");
                setTimeout(() => navigate('/admin/employees'), 1000);
            }).catch(err => {
                if (err.response.data.message) {
                    openErrorSnackbar(`Error: ${err.response.data.message}`);
                } else {
                    openErrorSnackbar(`Error: ${err.message}`);
                }
                setLoading(false);
            });
        }

    };

    useEffect(() => {
        let employee = props.employee;
        if (employee !== undefined) {
            setValues({
                name: employee.name,
                username: employee.username,
                email: employee.email,
                phone: employee.phone,
                password: '',
                address: employee.address,
                points: employee.points,
                customer: employee.roles.includes('customer'),
                employee: employee.roles.includes('employee'),
                admin: employee.roles.includes('admin'),
                receptionist: employee.roles.includes('receptionist'),
                owner: employee.roles.includes('owner')
            });
            setPasswordEnable(false);
        }
    }, []);

    return (
        <>
            <CustomSnackbar {...snackbar} open={open} setOpen={setOpen} />
            <div className='employee-form-container'>
                <Box sx={{ width: '50%', minWidth: '30rem', maxWidth: '60rem' }}>
                    <h3>Add Employee</h3>
                    <br />
                    <Box
                        sx={{ width: '100%' }}
                        component='form'
                        noValidate
                        autoComplete='off'
                        onSubmit={handleSubmit}
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <TextField
                                            label='Name'
                                            fullWidth
                                            required
                                            value={values.name}
                                            name="name"
                                            size='small'
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <TextField
                                            label='Username'
                                            fullWidth
                                            value={values.username}
                                            size='small'
                                            name="username"
                                            required
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField
                                            label='Email'
                                            fullWidth
                                            required
                                            name="email"
                                            value={values.email}
                                            type="email"
                                            size='small'
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <TextField
                                            label='Phone'
                                            fullWidth
                                            value={values.phone}
                                            size='small'
                                            onChange={handleChange}
                                            name='phone'
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField
                                            label='Address'
                                            fullWidth
                                            value={values.address}
                                            required
                                            name="address"
                                            onChange={handleChange}
                                            size='small'
                                        />
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <TextField
                                            label='Points'
                                            value={values.points}
                                            fullWidth
                                            size='small'
                                            onChange={handleChange}
                                            name='points'
                                            type="number"
                                            required
                                        />
                                    </td>
                                </tr>
                                {
                                    passwordEnable && <tr>
                                        <td>
                                            <TextField
                                                label='Password'
                                                fullWidth
                                                value={values.password}
                                                name="password"
                                                type="password"
                                                onChange={handleChange}
                                                size='small'
                                            />
                                        </td>
                                        <td className='gap'></td>
                                        <td>

                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <td>
                                        <input type="checkbox" name="customer" id="customer" checked={values.customer} onChange={handleChangeCheckbox} />
                                        <label htmlFor="customer"> Customer</label>
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <input type="checkbox" name="admin" id="admin" checked={values.admin} onChange={handleChangeCheckbox} />
                                        <label htmlFor="admin"> Admin</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" name="owner" id="owner" checked={values.owner} onChange={handleChangeCheckbox} />
                                        <label htmlFor="owner"> Owner</label>
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <input type="checkbox" name="receptionist" id="receptionist" checked={values.receptionist} onChange={handleChangeCheckbox} />
                                        <label htmlFor="receptionist"> Receptionist</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" name="employee" id="employee" checked={values.employee} onChange={handleChangeCheckbox} />
                                        <label htmlFor="employee"> Employee</label>
                                    </td>
                                    <td className='gap'></td>
                                    <td>

                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <LoadingButton
                                            variant='contained'
                                            fullWidth
                                            loading={loading}
                                            type='submit'
                                            sx={{ py: '0.8rem', mt: '1rem' }}
                                        >
                                            Save
                                        </LoadingButton>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>

                </Box>
            </div>
        </>
    )
}

export default AddEditEmployeeForm;