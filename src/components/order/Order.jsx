/* eslint-disable no-underscore-dangle */
import { styled } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../store/orders/order.thunk'

const Order = () => {
    const dispatch = useDispatch()
    const items = useSelector((state) => state.order.items)

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    return (
        <Container>
            {items.map((item) =>
                item.items.map((meal) => (
                    <MealContainer key={meal._id}>
                        <p>{meal.title}</p>
                        <p>${meal.price}</p>
                        <span>x{meal.amount}</span>
                    </MealContainer>
                ))
            )}
        </Container>
    )
}

export default Order

const Container = styled('div')(({ theme }) => ({
    display: 'grid',
    gap: '10px',
    background: theme.palette.primary.dark,
    color: '#fff',
}))

const MealContainer = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottom: '1px solid #222',
}))
