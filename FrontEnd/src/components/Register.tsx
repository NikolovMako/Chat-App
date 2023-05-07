import React, { useState } from 'react'
import { Box, Button, CircularProgress, IconButton, InputAdornment, Link, Snackbar, SvgIcon, TextField, Typography } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { windowWidthTracker } from '../utils/windowWidthTracker';
import { useForm } from 'react-hook-form';
import { userValidation } from '../schema/validation';
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios';

export default function Register() {
    const [isHidden, setIsHidden] = useState<boolean>(true)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate()
    windowWidthTracker(setWindowWidth)
    const { handleSubmit, register, formState: { isValid, errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onTouched',
        resolver: yupResolver(userValidation),
    })
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const registerData = async (data: any) => {
        try {
            await axios.post(
                'http://localhost:5000/register',
                data
            )
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                navigate('/login',{
                    state: {
                        user: data?.username || '',
                        isSnackbar: true,
                    }
                })
            }, 1000)
        } catch (err) {
            // @ts-expect-error response error
            setMessage(err?.response?.data?.message)
            setIsOpen(true)
        }
    }

    const onSubmit = (data: any) => registerData(data)

    return <Box width='100vw' height='100vh' display='flex' justifyContent='center'>
        <form onSubmit={handleSubmit(onSubmit)} style={{ alignSelf: 'center', marginBottom: '200px' }}>
            <Box
                sx={{
                    alignSelf: 'center',
                    display: 'flex',
                    padding: '0px',
                    flexDirection: 'column',
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
                <Typography variant='h6' color='#222e50'>Register</Typography>
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
                        input: {
                            color: '#222e50',
                        },
                        ".MuiFormHelperText-root": {
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            color: 'red'
                        }
                    }}
                    color='info'
                    variant='filled'
                    {...register('username')}
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
                        ".MuiFormHelperText-root": {
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            color: 'red'
                        },
                        ".MuiFilledInput-root": {
                            pr: '8px'
                        }
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
                    label='Password'
                    {...register('password')}
                />
                {
                    isLoading ? <CircularProgress /> : <Button sx={{
                        ":disabled": {
                            background: '#edf7f6',
                        }
                    }} disabled={!isValid} variant='contained' type='submit'>Sign Up</Button>
                }

                <Link
                    onClick={() => navigate('/login')}
                    sx={{
                        typography: 'h6',
                        cursor: 'pointer',
                    }}
                    underline='hover'
                >Already have an account?</Link>
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