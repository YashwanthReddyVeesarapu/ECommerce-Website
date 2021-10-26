import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Edit from '../../components/Edit'
import { fetchProductStart } from '../../redux/Products/products.actions';

const Aedit = () => {
    const dispatch = useDispatch();
    const { productID } = useParams();

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )
    }, [productID]);

    return (
        <div>
            Edit Product
            <Edit />

        </div>
    )
}

export default Aedit
