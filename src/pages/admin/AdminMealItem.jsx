/* eslint-disable no-underscore-dangle */
import React from 'react'
import Button from '../../components/UI/Button'

const MealItem = ({ item, removeMealHandler, editHandler }) => {
    return (
        <>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.price} </p>
            <Button onClick={() => removeMealHandler(item._id)}>Delete</Button>
            <Button onClick={editHandler}>Edit</Button>
        </>
    )
}

export default MealItem
