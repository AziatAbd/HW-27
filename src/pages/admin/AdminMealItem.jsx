/* eslint-disable no-underscore-dangle */
import { styled } from '@mui/system'
import React from 'react'
import Button from '../../components/UI/Button'

const MealItem = ({ item, removeMealHandler, editHandler, setEdit }) => {
    const onEdit = (id) => {
        editHandler(id)
        setEdit(true)
    }

    return (
        <Container>
            <Meal>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <p>${item.price} </p>
            </Meal>
            <BtnContainer>
                <Button onClick={() => removeMealHandler(item._id)}>
                    Delete
                </Button>
                <Button onClick={() => onEdit(item._id)}>Edit</Button>
            </BtnContainer>
        </Container>
    )
}

export default MealItem

const Container = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}))

const BtnContainer = styled('div')(() => ({
    display: 'grid',
    gap: '30px',
}))

const Meal = styled('div')(() => ({
    margin: '0',

    p: {
        fontSize: '20px',
        fontWeight: 600,
    },
}))
