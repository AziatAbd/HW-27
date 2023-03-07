/* eslint-disable no-underscore-dangle */
import { styled } from '@mui/system'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import Button from '../../components/UI/Button'
import { getMeals, deleteMeal, postMeal } from '../../store/meals/mealsThunk'
import MealItem from './AdminMealItem'
import MealForm from './MealForm'
import UpdateMealForm from './UpdateMealForm'

const AdminMeals = () => {
    const dispatch = useDispatch()
    const { meals } = useSelector((state) => state.meals)
    const [isEdit, setEdit] = useState(false)
    const [mealModal, setMealModal] = useSearchParams()

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

    const submitHandler = ({ title, description, price }) => {
        const newMeal = {
            title,
            description,
            price,
        }
        dispatch(postMeal(newMeal))
        closeModalHandler()
    }

    const removeMealHandler = (id) => {
        dispatch(deleteMeal(id))
    }

    const editHandler = () => {
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
                            {isEdit ? (
                                <UpdateMealForm item={item} setEdit={setEdit} />
                            ) : (
                                <MealItem
                                    item={item}
                                    removeMealHandler={removeMealHandler}
                                    editHandler={editHandler}
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
}))

const Meals = styled('div')(() => ({
    border: '1px solid',
}))
