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
import './login.css';
import CustomSnackbar from '../snackbar/snackbar';
import { AuthService } from '../../services/auth_service';
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from '../../utils/cookies';

const loginSchema = object({
    username:
        string()
            .trim()
            .nonempty('Username is required'),
    password:
        string()
            .nonempty('Password is required'),
});

type LoginInput = TypeOf<typeof loginSchema>;

function Login() {

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
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
        setLoading(true);
        AuthService.login(values.username, values.password).then(res => {
            if (res.status == 200) {
                setCookie('token', res.data.password!);
                openSuccessSnackbar("Login success.");
                setTimeout(() => navigate('/'), 1000);
            } else {
                openErrorSnackbar(`Login failed : ${res.statusText}`);
                setLoading(false);
            }
        })
            .catch(err => {
                console.log(err);
                if (err.response.data.message) {
                    openErrorSnackbar(`Login failed : ${err.response.data.message}`);
                } else {
                    openErrorSnackbar(`Login failed : ${err.message}`);
                }
                setLoading(false);
            })
    };

    return (
        <>
            <CustomSnackbar {...snackbar} open={open} setOpen={setOpen} />
            <div className='login-form-container'>
                <Box sx={{ width: '50%', minWidth: '20rem', maxWidth: '30rem' }}>
                    <Typography variant='h4' component='h2' sx={{ mb: '2rem' }}>
                        Login
                    </Typography>
                    <Box
                        sx={{ width: '100%' }}
                        component='form'
                        noValidate
                        autoComplete='off'
                        onSubmit={handleSubmit(onSubmitHandler)}>
                        <TextField
                            label='Username'
                            sx={{ mb: '2rem' }}
                            fullWidth
                            required
                            size='small'
                            error={!!errors['username']}
                            helperText={errors['username'] ? errors['username'].message : ''}
                            {...register('username')}
                        />
                        <TextField
                            label='Password'
                            fullWidth
                            size='small'
                            sx={{ mb: '2rem' }}
                            required
                            type='password'
                            error={!!errors['password']}
                            helperText={
                                errors['password'] ? errors['password'].message : ''
                            }
                            {...register('password')}
                        />
                        <LoadingButton
                            variant='contained'
                            fullWidth
                            type='submit'
                            loading={loading}
                            sx={{ py: '0.8rem', mt: '1rem' }}
                        >
                            Login
                        </LoadingButton>
                    </Box>
                    <hr />
                    <p>Don't have an account? <Link to="/register">Register Now</Link></p>
                </Box>
            </div>
        </>
    )
}

export default Login;