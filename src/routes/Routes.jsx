import React from 'react'
import { Routes as Router, Route } from 'react-router-dom'
import UserLayout from '../layout/UserLayout'
import MealsPage from '../pages/MealsPage'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'

const Routes = () => {
    return (
        <Router>
            <Route path="/" element={<UserLayout />}>
                <Route index element={<MealsPage />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="signin" element={<SignIn />} />
            </Route>
        </Router>
    )
}

export default Routes
