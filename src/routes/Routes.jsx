import React from 'react'
import { Routes as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserLayout from '../layout/UserLayout'
import MealsPage from '../pages/user/MealsPage'
import AdminLayout from '../layout/AdminLayout'
import Orders from '../pages/admin/Orders'
import ProtectedRoute from './ProtectedRoute'
import UserRoles from '../lib/constants/common'
import AdminMeals from '../pages/admin/AdminMeals'
import SignUp from '../pages/guest/SignUp'
import SignIn from '../pages/guest/SignIn'
import NotFound from '../pages/guest/NotFound'
import Order from '../components/order/Order'

const Routes = () => {
    const role = useSelector((state) => state.auth.user.role)

    const isAllowed = (roles) => {
        return roles.includes(role)
    }

    return (
        <Router>
            <Route
                path="/"
                element={
                    <ProtectedRoute
                        isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
                        fallBackPath="/admin/meals"
                        component={UserLayout}
                    />
                }
            >
                <Route
                    index
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath="/admin/meals"
                            component={MealsPage}
                        />
                    }
                />
                <Route
                    path="my-order"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath="/admin/meals"
                            component={Order}
                        />
                    }
                />
                <Route
                    path="signup"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? '/admin/meals' : '/'
                            }
                            component={SignUp}
                        />
                    }
                />
                <Route
                    path="signin"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? '/admin/meals' : '/'
                            }
                            component={SignIn}
                        />
                    }
                />
            </Route>

            <Route
                path="/admin"
                element={
                    <ProtectedRoute
                        isAllowed={isAllowed([UserRoles.ADMIN])}
                        fallBackPath="/"
                        component={AdminLayout}
                    />
                }
            >
                <Route
                    path="meals"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            component={AdminMeals}
                        />
                    }
                />
                <Route
                    path="orders"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            component={Orders}
                        />
                    }
                />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Router>
    )
}

export default Routes
