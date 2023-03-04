import { Grid, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../components/UI/Button'
import UserRoles from '../lib/constants/common'
import signUp from '../store/auth/auth.thunk'

const SignUp = () => {
    const dispatch = useDispatch()
    const submitHandler = ({ email, name, password }) => {
        const data = {
            email,
            name,
            password,
            role: UserRoles.ADMIN,
        }

        dispatch(signUp(data))
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: submitHandler,
    })

    const { values, handleChange, handleSubmit } = formik

    return (
        <MainGrid>
            <GridContainer>
                <form onSubmit={handleSubmit}>
                    <FormGrid>
                        <TextField
                            value={values.name}
                            onChange={handleChange}
                            label="Name"
                            name="name"
                            type="text"
                        />
                        <TextField
                            value={values.email}
                            onChange={handleChange}
                            name="email"
                            label="Email"
                        />
                        <TextField
                            value={values.password}
                            onChange={handleChange}
                            name="password"
                            label="Password"
                        />
                        <TextField
                            value={values.confirmPassword}
                            onChange={handleChange}
                            name="confirmPassword"
                            label="Confirm Password"
                        />
                        <Button type="submit">Sign up</Button>
                        <Link to="/signin">Have an account</Link>
                    </FormGrid>
                </form>
            </GridContainer>
        </MainGrid>
    )
}

export default SignUp

const MainGrid = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '200px',
}))

const GridContainer = styled(Grid)(() => ({
    background: '#fff',
    width: '500px',
    padding: '20px',
}))

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}))
