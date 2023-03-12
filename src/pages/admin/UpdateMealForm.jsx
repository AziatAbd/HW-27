import { Box, Modal, styled, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../components/UI/Button'
import { editMeal } from '../../store/meals/mealsThunk'
import { uiActions } from '../../store/UI/ui.slice'

const UpdateMealForm = ({ item, setEdit, onClose, onOpen }) => {
    const dispatch = useDispatch()

    const updateMealHandler = async ({ title, description, price }) => {
        try {
            const updateMeal = {
                title,
                description,
                price,
            }

            const data = {
                // eslint-disable-next-line no-underscore-dangle
                id: item._id,
                editData: updateMeal,
            }
            await dispatch(editMeal(data)).unwrap()
            dispatch(
                uiActions.showSnackbar({
                    isOpen: true,
                    severity: 'success',
                    message: 'izmeneno',
                })
            )
            onClose()
            setEdit(false)
        } catch (error) {
            dispatch(
                uiActions.showSnackbar({
                    isOpen: true,
                    severity: 'error',
                    message: 'ne izmeneno',
                })
            )
        }
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
        <StyledModal onClose={onClose} open={onOpen}>
            <StyledBox>
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
                    <Button onClick={onClose}>Cancel</Button>
                </Form>
            </StyledBox>
        </StyledModal>
    )
}

export default UpdateMealForm

const StyledModal = styled(Modal)(() => ({
    display: 'flex',
    width: '100%',
    height: '100%',
}))

const StyledBox = styled(Box)(() => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
}))

const Form = styled('form')(() => ({
    display: 'grid',
    gap: '20px',
    width: '50%',
    background: '#fff',
    padding: '20px',
}))
