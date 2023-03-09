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
                    message: 'oreder has been added successfully.',
                })
            )
        } catch (error) {
            dispatch(
                uiActions.showSnackbar({
                    isOpen: true,
                    severity: 'error',
                    message: 'Failed',
                })
            )
        } finally {
            closeModalHandler()
        }
    }

    const removeMealHandler = (id) => {
        dispatch(deleteMeal(id))
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
            {mealModal.has('modal') ? (
                <MealForm
                    values={values}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    onClose={closeModalHandler}
                />
            ) : (
                <div>
                    <Button onClick={openModalHandler}>Add meal</Button>
                    <h1>Meals</h1>
                    {meals.map((item) => (
                        <Meals key={item._id}>
                            {isEdit && editingMealId === item._id ? (
                                <UpdateMealForm item={item} setEdit={setEdit} />
                            ) : (
                                <MealItem
                                    item={item}
                                    removeMealHandler={removeMealHandler}
                                    editHandler={() => editHandler(item._id)}
                                />
                            )}
                        </Meals>
                    ))}
                </div>
            )}
        </Container>
    )
}

export default AdminMeals

const Container = styled('div')(() => ({
    margin: '30px 0 ',
    background: '#fff',
}))

const Meals = styled('div')(() => ({
    border: '1px solid',
    padding: '10px',
}))
