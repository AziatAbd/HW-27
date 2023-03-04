import { Grid, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/UI/Button'
import { signIn } from '../store/auth/auth.thunk'

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = async ({ email, password }) => {
        try {
            const loginData = {
                email,
                password,
            }
            await dispatch(signIn(loginData)).unwrap()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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
                            value={values.email}
                            onChange={handleChange}
                            label="Email"
                            name="email"
                        />
                        <TextField
                            value={values.password}
                            onChange={handleChange}
                            label="Password"
                            name="password"
                        />
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
    display: 'flex',
    flexDirection: 'column',
}))
