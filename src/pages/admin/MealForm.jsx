import { TextField } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import Button from '../../components/UI/Button'

const MealForm = ({ values, handleChange, handleSubmit, onClose }) => {
    return (
        <FormContainer>
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
                <Button type="submit">Add</Button>
                <Button onClick={onClose}>Close</Button>
            </Form>
        </FormContainer>
    )
}

export default MealForm

const FormContainer = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
}))

const Form = styled('form')(() => ({
    display: 'grid',
    gap: '20px',
    width: '50%',
}))
