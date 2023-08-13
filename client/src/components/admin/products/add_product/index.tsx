import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { ProductService } from '../../../../services/product_service';
import Product from '../../../../models/Product';
import { useParams } from 'react-router-dom';
import AddEditProductForm from './form';

function AddEditProduct() {

    const params = useParams();
    const id = params.id;
    
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        if (id !== undefined) {
            ProductService.getProduct(id).then(res => {
                setProduct(res.data);
            }).catch(err => console.log(err));
        }
    }, []);

    return (
        <>
            {
                product !== null ? <AddEditProductForm product={product} /> : <AddEditProductForm />
            }
        </>
    );
}

export default AddEditProduct;