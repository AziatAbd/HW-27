import { Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/UI/Button'
import { signIn } from '../store/auth/auth.thunk'

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const submitHandler = ({ email, password }) => {
        const loginData = {
            email,
            password,
        }

        setError('')

        dispatch(signIn(loginData))
            .unwrap()
            .then(() => navigate('/'))
            .catch((e) => setError(e.response.data.message))
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: submitHandler,
    })

    const { values, handleChange, handleSubmit } = formik

    const isEmailValid = () => {
        return (
            values.email.length === 0 ||
            (values.email.length > 0 && values.email.includes('@'))
        )
    }
    const isPasswordValid = () => {
        return (
            values.password.length === 0 ||
            (values.password.length > 0 && values.password >= 6)
        )
    }

    return (
        <MainGrid>
            <GridContainer>
                <form onSubmit={handleSubmit}>
                    <FormGrid>
                        <TextField
                            error={!isEmailValid}
                            value={values.email}
                            onChange={handleChange}
                            label="Email"
                            name="email"
                        />
                        <TextField
                            error={!isPasswordValid}
                            value={values.password}
                            onChange={handleChange}
                            label="Password"
                            name="password"
                        />
                        {error && <Error>{error}</Error>}
                        <Button type="submit">Sign In</Button>
                        <Link to="/signup">{`Don't have account`}</Link>
                    </FormGrid>
                </form>
            </GridContainer>
        </MainGrid>
    )
}

export default SignIn

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
    display: 'grid',
    flexDirection: 'column',
    gap: '20px',
}))

const Error = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    textAlign: 'center',
}))
