import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CustomSnackbar = ({ severity, message, open, setOpen }: any) => {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar;