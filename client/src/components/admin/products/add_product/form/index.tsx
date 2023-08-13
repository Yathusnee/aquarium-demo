import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
    TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CustomSnackbar from '../../../../snackbar/snackbar';
import { CategoryService } from '../../../../../services/category_service';
import Category from '../../../../../models/Category';
import { ProductService } from '../../../../../services/product_service';
import Product from '../../../../../models/Product';
import { useParams } from 'react-router-dom';

const productSchema = z.object({
    name:
        z.string()
            .trim()
            .nonempty('Name is required'),
    code:
        z.string()
            .trim()
            .nonempty('Code is required')
            .max(20, 'Code must be less than 50 characters'),
    category:
        z.string()
            .trim()
            .nonempty('Category is required'),
    subcategory:
        z.string()
            .trim()
            .nonempty('Sub Category is required'),
    description:
        z.string()
            .trim()
            .nonempty('Description is required'),
    sciencetific:
        z.string()
            .trim()
            .nonempty('Sciencetific name is required'),
    ph:
        z.string()
            .trim()
            .nonempty('PH value is required'),
    temperature:
        z.string()
            .trim()
            .nonempty('Temperature is required'),
    behaviour:
        z.string()
            .trim()
            .nonempty('Behaviour is required'),
    images:
        z.string()
            .trim()
            .nonempty('At least one image is required'),
    icon:
        z.string()
            .trim(),
    price:
        z.number()
            .gt(0, 'Price must be greater than zero.'),
    iconWidth:
        z.number()
            .gt(0, 'Icon width must be greater than zero.'),
    iconHeight:
        z.number()
            .gt(0, 'Icon height must be greater than zero.'),
    compatibility:
        z.any(),
});

type ProductInput = z.TypeOf<typeof productSchema>;

function AddEditProductForm({product}: any) {
    
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<Category>();
    const [subCategory, setSubCategory] = useState('');
    const label = { inputProps: { 'aria-label': 'Compatibility Calculator Availability' } };
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

    const handleChange = (event: SelectChangeEvent) => {
        for (let i in categories) {
            if (categories[i].name === (event.target.value as string)) {
                setCategory(categories[i]);
                break;
            }
        }
    };

    const handleChangeSubCategory = (event: SelectChangeEvent) => {
        setSubCategory(event.target.value as string);
    }

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
        setValue
    } = useForm<ProductInput>({
        resolver: zodResolver(productSchema),
    });

    const onSubmitHandler: SubmitHandler<ProductInput> = (values) => {
        setLoading(true);
        const obj = {
            ...values,
            images: values.images.split('\n')
        }
        ProductService.addProduct(obj as unknown as Product).then(res => {
            reset();
            setLoading(false);
            openSuccessSnackbar('Product added successfully!');
        }).catch(err => {
            console.log(err);
            setLoading(false);
            openErrorSnackbar(err);
        })
    };

    useEffect(() => {
        CategoryService.getAllCategories().then(res => {
            if (res.status === 200) {
                setCategories(res.data);
            }
        }).catch(err => {
            console.log(err);
            openErrorSnackbar(err);
        });

        if (product !== undefined) {
            setValue('name', product.name);
            setValue('code', product.code);
            setValue('category', product.category);
            setValue('subcategory', product.subcategory);
            setValue('description', product.description);
            setValue('sciencetific', product.sciencetific);
            setValue('temperature', product.temperature);
            setValue('ph', product.ph);
        }
    }, []);

    return (
        <>
            <CustomSnackbar {...snackbar} open={open} setOpen={setOpen} />
            <div className='product-form-container'>
                <Box sx={{ width: '50%', minWidth: '30rem', maxWidth: '60rem' }}>
                    <h3>Add Product</h3>
                    <br />
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
                                            label='Name'
                                            fullWidth
                                            required
                                            size='small'
                                            error={!!errors['name']}
                                            helperText={errors['name'] ? errors['name'].message : ''}
                                            {...register('name')}
                                        />
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <TextField
                                            label='Code'
                                            fullWidth
                                            size='small'
                                            required
                                            error={!!errors['code']}
                                            helperText={errors['code'] ? errors['code'].message : ''}
                                            {...register('code')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={category === undefined ? '' : category?.name}
                                                error={!!errors['category']}
                                                label="Category"
                                                {...register('category')}
                                                onChange={handleChange}>
                                                {
                                                    categories.map((category, index) =>
                                                        <MenuItem key={index} value={category.name}>{category.name}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={subCategory === undefined ? '' : subCategory}
                                                error={!!errors['subcategory']}
                                                {...register('subcategory')}
                                                label="Sub Category"
                                                onChange={handleChangeSubCategory}>
                                                {
                                                    category?.subcategories.map((category, index) =>
                                                        <MenuItem key={index} value={category.name}>{category.name}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField
                                            label='Description'
                                            fullWidth
                                            size='small'
                                            required
                                            type='text'
                                            error={!!errors['description']}
                                            helperText={
                                                errors['description'] ? errors['description'].message : ''
                                            }
                                            {...register('description')}
                                        />
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <TextField
                                            label='Sciencetific Name'
                                            fullWidth
                                            size='small'
                                            required
                                            type='text'
                                            error={!!errors['sciencetific']}
                                            helperText={
                                                errors['sciencetific'] ? errors['sciencetific'].message : ''
                                            }
                                            {...register('sciencetific')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField
                                            label='Temperature'
                                            fullWidth
                                            size='small'
                                            required
                                            type='text'
                                            error={!!errors['temperature']}
                                            helperText={
                                                errors['temperature'] ? errors['temperature'].message : ''
                                            }
                                            {...register('temperature')}
                                        />
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <TextField
                                            label='PH Value'
                                            fullWidth
                                            size='small'
                                            required
                                            type='text'
                                            error={!!errors['ph']}
                                            helperText={
                                                errors['ph'] ? errors['ph'].message : ''
                                            }
                                            {...register('ph')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField
                                            label='Behaviour'
                                            fullWidth
                                            size='small'
                                            required
                                            type='text'
                                            error={!!errors['behaviour']}
                                            helperText={
                                                errors['behaviour'] ? errors['behaviour'].message : ''
                                            }
                                            {...register('behaviour')}
                                        />
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <TextField
                                            label='Price'
                                            fullWidth
                                            size='small'
                                            required
                                            type='number'
                                            error={!!errors['price']}
                                            helperText={
                                                errors['price'] ? errors['price'].message : ''
                                            }
                                            {...register('price', { valueAsNumber: true })}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField
                                            label='Icon Width'
                                            fullWidth
                                            size='small'
                                            required
                                            type='number'
                                            error={!!errors['iconWidth']}
                                            helperText={
                                                errors['iconWidth'] ? errors['iconWidth'].message : ''
                                            }
                                            {...register('iconWidth', { valueAsNumber: true })}
                                        />
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <TextField
                                            label='Icon Height'
                                            fullWidth
                                            size='small'
                                            required
                                            type='number'
                                            error={!!errors['iconHeight']}
                                            helperText={
                                                errors['iconHeight'] ? errors['iconHeight'].message : ''
                                            }
                                            {...register('iconHeight', { valueAsNumber: true })}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField
                                            label='Images'
                                            fullWidth
                                            size='small'
                                            required
                                            multiline
                                            rows={3}
                                            placeholder="first.jpg
second.jpg
                                            "
                                            type='text'
                                            error={!!errors['images']}
                                            helperText={
                                                errors['images'] ? errors['images'].message : ''
                                            }
                                            {...register('images')}
                                        />
                                    </td>
                                    <td className='gap'></td>
                                    <td>
                                        <TextField
                                            label='Icon'
                                            fullWidth
                                            size='small'
                                            type='text'
                                            error={!!errors['icon']}
                                            helperText={
                                                errors['icon'] ? errors['icon'].message : ''
                                            }
                                            {...register('icon')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Available in compatibility calculator</td>
                                    <td></td>
                                    <td><Switch {...label} {...register('compatibility')} defaultChecked size="small" /></td>
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
    );
}

export default AddEditProductForm;