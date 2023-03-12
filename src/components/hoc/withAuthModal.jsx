import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../UI/Button'

export const withAuthModal = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate()
        const [isModalOpen, setModalOpen] = useState(false)

        const goToSignInHandler = () => {
            setModalOpen(false)
            navigate('/signin')
        }

        return (
            <>
                <Component
                    {...props}
                    showAuthModal={() => setModalOpen(true)}
                />

                <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
                    <DialogTitle>Not Authorized</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            In order to complete this action, please sign in
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={goToSignInHandler}>
                            Go to Sign In
                        </Button>
                        <Button onClick={() => setModalOpen(false)}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
    return Wrapper
}
