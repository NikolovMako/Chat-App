import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import UserContext, { isAuthenticated } from "../hooks/useToken";
import jwt_decode from "jwt-decode"

type DecodedUser = {
    exp: number;
    iat: number;
    user: string;
    _id: string;
}

export default function Navigation({ children }: { children: JSX.Element }): JSX.Element {
    const navigate = useNavigate()
    const [token, setToken] = React.useContext(UserContext)
    const [currentUser, setCurrentUser] = React.useState<string>('')
    const { pathname } = window.location
    const user = isAuthenticated()

    const handleLogOut = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/login');
    };

    useEffect(() => {
        if (user) navigate('/chat-page')
        if (!user && pathname === "/chat-page") navigate('/login')
    }, [user])

    useEffect(() => {
        if (token) {
            const decodedToken = jwt_decode<DecodedUser>(token)
            setCurrentUser(decodedToken?.user)
        }
    }, [token])

    return <Box display='flex' flexDirection='column' height='100vh' overflow='hidden'>
        {token !== '' ? (
            <Box width='100%' sx={{ background: '#fccb06' }} padding='10px' display='flex' justifyContent='space-between'>
                <Typography variant="h2" sx={{ color: '#007FFF', ml: '100px', padding: 'auto', width: 'auto', height: 'auto' }}>Chatoor</Typography>
                <Box alignSelf='self-end' display='flex' alignItems='baseline' gap='25px'>
                    <Typography variant="h6" sx={{ color: '#007FFF', ml: '100px', padding: 'auto', width: 'auto', height: 'auto' }}>{currentUser || ''}</Typography>
                    <Button sx={{ color: '#007FFF', mr: '100px', width: 'auto', height: 'auto' }} onClick={handleLogOut}>
                        Logout
                    </Button>
                </Box>
            </Box>
        ) : (
            <Box width='100%' sx={{ background: '#fccb06' }} padding='10px'>
                <Typography variant="h2" sx={{ color: '#007FFF', ml: '100px', padding: 'auto', width: 'auto', height: 'auto' }}>Chatoor</Typography>
            </Box>
        )}
        {children}
    </Box>
}