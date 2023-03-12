/* eslint-disable no-underscore-dangle */
import { styled } from '@mui/system'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import Button from '../../components/UI/Button'
import { getMeals, deleteMeal, postMeal } from '../../store/meals/mealsThunk'
import { uiActions } from '../../store/UI/ui.slice'
import MealItem from './AdminMealItem'
import MealForm from './MealForm'
import UpdateMealForm from './UpdateMealForm'

const AdminMeals = () => {
    const dispatch = useDispatch()
    const { meals } = useSelector((state) => state.meals)
    const [isEdit, setEdit] = useState(false)
    const [mealModal, setMealModal] = useSearchParams()
    const [editingMealId, setEditingMealId] = useState(null)

    useEffect(() => {
        dispatch(getMeals())
    }, [])

    const openModalHandler = () => {
        mealModal.set('modal', 'addMeal')
        setMealModal(mealModal)
    }

    const closeModalHandler = () => {
        mealModal.delete('modal')
        setMealModal(mealModal)
        setEdit(false)
    }

    const submitHandler = async ({ title, description, price }) => {
        try {
            const newMeal = {
                title,
                description,
                price,
            }
            await dispatch(postMeal(newMeal)).unwrap()
            dispatch(
                uiActions.showSnackbar({
                    isOpen: true,
                    severity: 'success',
                    message: 'dobavleno.',
                })
            )
        } catch (error) {
            dispatch(
                uiActions.showSnackbar({
                    isOpen: true,
                    severity: 'error',
                    message: 'ne dobavleno',
                })
            )
        } finally {
            closeModalHandler()
        }
    }

    const removeMealHandler = async (id) => {
        try {
            await dispatch(deleteMeal(id)).unwrap()
            dispatch(
                uiActions.showSnackbar({
                    isOpen: true,
                    severity: 'success',
                    message: 'delete',
                })
            )
        } catch (error) {
            dispatch(
                uiActions.showSnackbar({
                    isOpen: true,
                    severity: 'error',
                    message: 'ne delete',
                })
            )
        }
    }

    const editHandler = (id) => {
        setEditingMealId(id)
        setEdit(true)
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
        },
        onSubmit: submitHandler,
    })
    const { values, handleChange, handleSubmit } = formik

    return (
        <Container>
            {mealModal.has('modal') && (
                <MealForm
                    values={values}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    onClose={closeModalHandler}
                    onOpen={mealModal}
                />
            )}

            <div>
                <Button onClick={openModalHandler}>Add meal</Button>
                <h1>Meals</h1>
                {meals.map((item) => (
                    <Meals key={item._id}>
                        {editingMealId === item._id && (
                            <UpdateMealForm
                                item={item}
                                setEdit={setEdit}
                                onClose={closeModalHandler}
                                onOpen={isEdit}
                            />
                        )}
                        <MealItem
                            item={item}
                            removeMealHandler={removeMealHandler}
                            editHandler={editHandler}
                            setEdit={setEdit}
                        />
                    </Meals>
                ))}
            </div>
        </Container>
    )
}

export default AdminMeals

const Container = styled('div')(() => ({
    margin: '30px 0 ',
    background: '#fff',
    padding: '20px',
}))

const Meals = styled('div')(() => ({
    border: '1px solid',
    padding: '20px',
}))
