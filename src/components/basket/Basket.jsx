import { Box, Modal, styled } from '@mui/material'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styledComponents from 'styled-components'
import {
    deleteBasketItem,
    submitOrder,
    updateBasketItem,
} from '../../store/basket/basketThunk'
import { uiActions } from '../../store/UI/ui.slice'
import BasketItem from './BasketItem'
import TotalAmount from './TotalAmount'

const Basket = ({ onClose, open }) => {
    const dispatch = useDispatch()
    const items = useSelector((state) => state.basket.items)

    const getTotalPrice = useCallback(() => {
        return items.reduce((sum, { amount, price }) => sum + amount * price, 0)
    }, [items])

    const decrementAmount = (id, amount) => {
        if (amount > 1) {
            dispatch(updateBasketItem({ amount: amount - 1, id }))
        } else {
            dispatch(deleteBasketItem(id))
        }
    }

    const incrementAmount = (id, amount) => {
        dispatch(updateBasketItem({ amount: amount + 1, id }))
    }

    const orderSubmitHandler = async () => {
        try {
            await dispatch(
                submitOrder({
                    orderData: { items },
                })
            ).unwrap()
            dispatch(
                uiActions.showSnackbar({
                    isOpen: true,
                    severity: 'success',
                    message: 'Order completed successfully',
                })
            )
        } catch (error) {
            dispatch(
                uiActions.showSnackbar({
                    isOpen: true,
                    severity: 'error',
                    message: 'Failed try again later',
                })
            )
        } finally {
            onClose()
        }
    }

    return (
        <Modal onClose={onClose} open={open}>
            <StyledModalContent>
                <Content>
                    {items.length ? (
                        <FixedHeightContainer>
                            {items.map((item) => (
                                <BasketItem
                                    // eslint-disable-next-line no-underscore-dangle
                                    key={item._id}
                                    incrementAmount={() =>
                                        // eslint-disable-next-line no-underscore-dangle
                                        incrementAmount(item._id, item.amount)
                                    }
                                    decrementAmount={() =>
                                        // eslint-disable-next-line no-underscore-dangle
                                        decrementAmount(item._id, item.amount)
                                    }
                                    title={item.title}
                                    price={item.price}
                                    amount={item.amount}
                                />
                            ))}
                        </FixedHeightContainer>
                    ) : null}
                    <TotalAmount
                        price={getTotalPrice()}
                        onCLose={onClose}
                        onOrder={orderSubmitHandler}
                    />
                </Content>
            </StyledModalContent>
        </Modal>
    )
}

export default Basket

const Content = styledComponents.div`
  width: 100%;
  height: 100%;
  padding: 0 1rem 1.5rem 1rem;
`

const FixedHeightContainer = styledComponents.div`
  max-height: 228px;
  overflow-y: scroll;
`

const StyledModalContent = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: '20vh',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    padding: '16px',
    borderRadius: '14px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
    zIndex: 30,
    animation: 'slide-down 300ms ease-out forwards',
    width: '640px',
    left: 'calc(50% - 20rem)',

    '@keyframes slide-down': {
        'from ': {
            opacity: 0,
            transform: 'translateY(-3rem)',
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)',
        },
    },
}))
