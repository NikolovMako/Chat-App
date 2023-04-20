import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import UserContext, { isAuthenticated } from "../hooks/useToken";

export default function Navigation({ children }: { children: JSX.Element }): JSX.Element {
    const navigate = useNavigate()
    const [token, setToken] = React.useContext(UserContext)
    const { pathname } = window.location

    const user = isAuthenticated()

    useEffect(() => {
        if (user !== '') navigate('/chat-page')
        if (user === '') navigate('/login')
    }, [user])

    const handleLogOut = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/login');
    };

    return <Box display='flex' flexDirection='column' height='100vh' overflow='hidden'>
        {token !== '' ? (
            <Box width='100%' sx={{ background: '#fccb06' }} padding='10px' display='flex' justifyContent='space-between'>
                <Typography variant="h2" sx={{ color: '#007FFF', ml: '100px', padding: 'auto', width: 'auto', height: 'auto' }}>Chatoor</Typography>
                <Button sx={{ color: '#007FFF', mr: '100px', width: 'auto', height: 'auto' }} onClick={handleLogOut}>
                    Logout
                </Button>
            </Box>
        ) : (
            <Box width='100%' sx={{ background: '#fccb06' }} padding='10px'>
                <Typography variant="h2" sx={{ color: '#007FFF', ml: '100px', padding: 'auto', width: 'auto', height: 'auto' }}>Chatoor</Typography>
            </Box>
        )}
        {children}
    </Box>
}