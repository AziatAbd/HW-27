import { styled, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../components/UI/Button'
import { editMeal } from '../../store/meals/mealsThunk'

const UpdateMealForm = ({ item, setEdit }) => {
    const dispatch = useDispatch()

    const updateMealHandler = ({ title, description, price }) => {
        const updateMeal = {
            title,
            description,
            price,
        }
        console.log(updateMeal)

        const data = {
            // eslint-disable-next-line no-underscore-dangle
            id: item._id,
            editData: updateMeal,
        }
        dispatch(editMeal(data))
        setEdit(false)
    }
    const updateMealFormik = useFormik({
        initialValues: {
            title: item.title,
            description: item.description,
            price: item.price,
        },
        onSubmit: updateMealHandler,
    })

    const { values, handleChange, handleSubmit } = updateMealFormik

    return (
        <Form onSubmit={handleSubmit}>
            <TextField
                value={values.title}
                onChange={handleChange}
                name="title"
                label="Name"
                type="text"
            />
            <TextField
                value={values.description}
                onChange={handleChange}
                name="description"
                label="Description"
                type="text"
            />
            <TextField
                value={values.price}
                onChange={handleChange}
                name="price"
                label="Price"
                type="number"
            />
            <Button type="submit">Save</Button>
            <Button onClick={() => setEdit(false)}>Cancel</Button>
        </Form>
    )
}

export default UpdateMealForm

const Form = styled('form')(() => ({
    display: 'grid',
    gap: '20px',
    width: '50%',
}))
