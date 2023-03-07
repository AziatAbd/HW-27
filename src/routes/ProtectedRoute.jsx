import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, fallBackPath, isAllowed }) => {
    if (!isAllowed) {
        return <Navigate to={fallBackPath} />
    }
    return <Component />
}

export default ProtectedRoute
