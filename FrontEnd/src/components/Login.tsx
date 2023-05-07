import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, InputAdornment, SvgIcon, TextField, Typography, CircularProgress, Snackbar } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';
import Link from '@mui/material/Link';
import { windowWidthTracker } from '../utils/windowWidthTracker';
import { useForm } from 'react-hook-form';
import { userValidation } from '../schema/validation';
import { yupResolver } from '@hookform/resolvers/yup'
import UserContext from '../hooks/useToken';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Login() {
    const [isHidden, setIsHidden] = useState<boolean>(true)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    windowWidthTracker(setWindowWidth)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [newToken, setToken] = React.useContext(UserContext)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const { state } = useLocation()

    const { handleSubmit, register, formState: { isValid, errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onTouched',
        resolver: yupResolver(userValidation),
    })

    const fetchData = async (data: any) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/login',
                data
            )
            setIsLoading(true)
            localStorage.setItem('token', JSON.stringify(response.data.token))
            setTimeout(() => {
                setToken(response.data.token)
                setIsLoading(false)
                navigate('/chat-page')
            }, 1000)
        } catch (err) {
            // @ts-expect-error response error
            setMessage(err?.response?.data?.message)
            setIsOpen(true)
        }
    }

    useEffect(() => {
        if (state && state?.isSnackbar) {
            setMessage(`User ${state?.user} created successfully`)
            setIsOpen(true)
        }
    }, [])

    const onSubmit = (data: any) => fetchData(data)
    return <Box width='100vw' height='100vh' display='flex' justifyContent='center'>
        <form onSubmit={handleSubmit(onSubmit)} style={{ alignSelf: 'center', marginBottom: '200px' }}>
            <Box
                sx={{
                    alignSelf: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0px',
                    gap: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: ' #fccb06',
                    borderRadius: '12px',
                    width: windowWidth > 400 ? '400px' : '100%',
                    maxWidth: '400px',
                    minWidth: 'auto',
                    height: '350px'
                }}>
                <Typography variant='h6' color='#222e50'>Login</Typography>
                <TextField
                    error={errors.username?.type === 'onChange'}
                    helperText={errors.username?.message}
                    InputLabelProps={{
                        style: { color: errors.username?.message ? 'red' : '#007FFF' },
                    }}
                    sx={{
                        background: '#edf7f6',
                        borderRadius: '4px',
                        minWidth: '270px',
                        input: { color: '#222e50' },
                        ".MuiFormHelperText-root": { color: 'red' }
                    }}
                    {...register('username')}
                    color='info'
                    variant='filled'
                    label='Username'
                />
                <TextField
                    error={errors.password?.type === 'onChange'}
                    helperText={errors.password?.message}
                    InputLabelProps={{
                        style: { color: errors.password?.message ? 'red' : '#007FFF' },
                    }}
                    sx={{
                        background: '#edf7f6',
                        borderRadius: '4px',
                        minWidth: '270px',
                        input: { color: '#222e50' },
                        ".MuiFormHelperText-root": { color: 'red' }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    disableRipple
                                    onClick={() => (isHidden ? setIsHidden(false) : setIsHidden(true))}
                                >
                                    <SvgIcon viewBox="0 0 16 16">
                                        {isHidden ? (
                                            <VisibilityOff
                                                sx={{ color: 'black' }}
                                            />
                                        ) : (
                                            <Visibility
                                                sx={{ color: 'black' }}
                                            />
                                        )}
                                    </SvgIcon>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    type={isHidden ? 'password' : 'text'}
                    color='info'
                    variant='filled'
                    {...register('password')}
                    label='Password'
                />
                {isLoading ? <CircularProgress /> : <Button variant='contained' disabled={!isValid} sx={{ ":disabled": { background: '#edf7f6' } }} type='submit'>Login</Button>}

                <Link
                    onClick={() => navigate('/register')}
                    sx={{
                        typography: 'h6',
                        cursor: 'pointer',
                    }}
                    underline='hover'
                >You don't have an account? Register</Link>
            </Box>
        </form>
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={() => setIsOpen(false)}
            message={message}
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'top'
            }}
        />
    </Box>
}