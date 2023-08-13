import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
    Box,
    TextField,
    Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import './register.css';
import User from '../../models/User';
import CustomSnackbar from '../snackbar/snackbar';
import { useNavigate } from "react-router-dom";
import { AuthService } from '../../services/auth_service';

const registerSchema = object({
    username:
        string()
            .trim()
            .nonempty('Username is required')
            .max(20, 'Username must be less than 20 characters'),
    name:
        string()
            .trim()
            .nonempty('Name is required')
            .max(50, 'Name must be less than 50 characters'),
    address:
        string()
            .trim()
            .nonempty('Address is required'),
    email:
        string()
            .nonempty('Email is required')
            .email('Email is invalid'),
    phone:
        string()
            .nonempty('Phone number is required')
            .min(10, 'Phone number must be more than 10 characters')
            .max(15, 'Phone number must be less than 15 characters'),
    password:
        string()
            .nonempty('Password is required')
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
    passwordConfirm:
        string()
            .nonempty('Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
});

type RegisterInput = TypeOf<typeof registerSchema>;

function Register() {

    const navigate = useNavigate();

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

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
        setLoading(true);
        const user = new User(values.username, values.name, values.password, values.email, values.address, values.phone);
        AuthService.register(user).then(res => {
            console.log(res);
            if (res.status == 201) {
                openSuccessSnackbar("Registered successfully.");
                setTimeout(() => navigate('/login'), 1000);
            } else {
                openErrorSnackbar(`Registration failed : ${res.statusText}`);
                setLoading(false);
            }
        })
            .catch(err => {
                if (err.response.data.message) {
                    openErrorSnackbar(`Registration failed : ${err.response.data.message}`);
                } else {
                    openErrorSnackbar(`Registration failed : ${err.message}`);
                }
                setLoading(false);
            })
    };

    return (
        <>
            <CustomSnackbar {...snackbar} open={open} setOpen={setOpen} />
            <div className='register-form-container'>
                <Box sx={{ width: '50%', minWidth: '30rem', maxWidth: '60rem' }}>
                    <Typography variant='h4' component='h2' sx={{ mb: '2rem' }}>
                        Register
                    </Typography>
                    <Box
                        sx={{ width: '100%' }}
                        component='form'
                        noValidate
                        autoComplete='off'
                        onSubmit={handleSubmit(onSubmitHandler)}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <TextField
                                            label='Username'
                                            fullWidth
                                            required
                                            size='small'
                                            error={!!errors['username']}
                                            helperText={errors['username'] ? errors['username'].message : ''}
                                            {...register('username')}
                                        />
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <TextField
                                            label='Email'
                                            fullWidth
                                            size='small'
                                            required
                                            error={!!errors['email']}
                                            helperText={errors['email'] ? errors['email'].message : ''}
                                            {...register('email')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <TextField
                                            label='Name'
                                            fullWidth
                                            size='small'
                                            required
                                            error={!!errors['name']}
                                            helperText={errors['name'] ? errors['name'].message : ''}
                                            {...register('name')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField

                                            label='Password'
                                            fullWidth
                                            size='small'
                                            required
                                            type='password'
                                            error={!!errors['password']}
                                            helperText={
                                                errors['password'] ? errors['password'].message : ''
                                            }
                                            {...register('password')}
                                        />
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <TextField
                                            label='Confirm Password'
                                            fullWidth
                                            size='small'
                                            required
                                            type='password'
                                            error={!!errors['passwordConfirm']}
                                            helperText={
                                                errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''
                                            }
                                            {...register('passwordConfirm')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField
                                            label='Phone'
                                            fullWidth
                                            size='small'
                                            required
                                            type='text'
                                            error={!!errors['phone']}
                                            helperText={
                                                errors['phone'] ? errors['phone'].message : ''
                                            }
                                            {...register('phone')}
                                        />
                                    </td>
                                    <td className='gap'></td>
                                    <td className='address-container'>
                                        <TextField
                                            label='Address'
                                            fullWidth
                                            multiline
                                            rows={4}
                                            size='small'
                                            required
                                            type='text'
                                            error={!!errors['address']}
                                            helperText={
                                                errors['address'] ? errors['address'].message : ''
                                            }
                                            {...register('address')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <LoadingButton
                                            variant='contained'
                                            fullWidth
                                            type='submit'
                                            loading={loading}
                                            sx={{ py: '0.8rem', mt: '1rem' }}
                                        >
                                            Register
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

export default Register;