import { Box, Modal, TextField } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import Button from '../../components/UI/Button'

const MealForm = ({ values, handleChange, handleSubmit, onClose, onOpen }) => {
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
                    <Button type="submit">Add</Button>
                    <Button onClick={onClose}>Close</Button>
                </Form>
            </StyledBox>
        </StyledModal>
    )
}

export default MealForm

const StyledModal = styled(Modal)(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
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
    borderRadius: '10px',
}))
