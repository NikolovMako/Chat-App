import React from "react";
import { Avatar, Box, TextField, Typography } from "@mui/material";
import Navigation from "../components/Navigation";

const users = [
    {
        name: 'MartinMartinMarMartinMartin'
    },
    {
        name: 'Peter'
    },
    {
        name: 'geoasdasdas'
    },
    {
        name: 'asdadasdasd'
    },
    {
        name: 'asdasdasdas'
    },
    {
        name: 'asdasda'
    },
    {
        name: '1231321312'
    },
    {
        name: 'as3a3as3'
    },
    {
        name: 'Martinaaaaa'
    },
    {
        name: 'Martinasdadasda'
    },
    {
        name: 'Martin123112321'
    },
    {
        name: 'asdasdasda'
    },
    {
        name: 'Martinaaaa'
    },
    {
        name: 'Martin213`31321312321'
    },
]

export default function ChatPage() {
    return <Navigation >
        <Box display='flex' gap='24px' mt="40px" width='80vw' alignSelf='center'>
            <Box sx={{
                minWidth: '400px',
                padding: '4px'
            }}>
                <Box width='100%' borderRadius='12px' height='60px' display='flex' justifyContent='center' alignItems='center'
                    sx={{
                        background: '#e2cc05',
                        boxShadow: '0px 0px 5px black',
                    }}>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: '#007FFF',
                            fontSize: '20px',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                        }}>
                        Users List
                    </Typography>
                </Box>
                <Box
                    mt='12px'
                    width='100%'
                    height='50vh'
                    borderRadius='12px'
                    boxShadow='0px 0px 10px black'
                    sx={{
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        '::-webkit-scrollbar': {
                            width: '5px',
                            marginLeft: '50px',
                        },
                        '::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 5px #ECF1F6',
                            borderRadius: '10px',
                            background: '#f1f1f1',
                        },
                        '::-webkit-scrollbar-thumb': {
                            background: '#888',
                            borderRadius: '10px',
                        },
                        '::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        },
                    }} >
                    {users.map((user) => <Box
                        sx={{
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            borderBottom: '1px solid black',
                            background: '#ffec41',
                            ":hover": {
                                background: '#e2cc05'
                            },
                            ":last-of-type": {
                                borderBottom: users.length > 9 ? 'none' : 'normal'
                            }
                        }}>
                        <Avatar alt='skeletonkata' sx={{ ml: '25px' }} />
                        <Typography
                            sx={{
                                color: 'black',
                                fontSize: '18px',
                                fontWeight: 700,
                            }}>
                            {user.name}
                        </Typography>
                    </Box>
                    )}
                </Box>
            </Box >
            <Box sx={{
                width: '100%',
                height: '100%',
                // boxShadow: '0px 0px 10px black'

            }}>
                <Box width='100%' borderRadius='12px' height='60px' display='flex' justifyContent='start' alignItems='center'
                    sx={{
                        background: '#e2cc05',
                        boxShadow: '0px 0px 5px black',
                    }}>
                    <Typography
                        sx={{
                            pl: '20px',
                            textAlign: 'center',
                            color: '#007FFF',
                            fontSize: '20px',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                        }}>
                        To:
                    </Typography>
                </Box>
                {/* chat info */}
                <Box
                    mt='12px'
                    width='100%'
                    height='45vh'
                    borderRadius='4px'
                    boxShadow='0px 0px 2px black'
                    sx={{
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        '::-webkit-scrollbar': {
                            width: '5px',
                            marginLeft: '50px',
                        },
                        '::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 5px #ECF1F6',
                            borderRadius: '10px',
                            background: '#f1f1f1',
                        },
                        '::-webkit-scrollbar-thumb': {
                            background: '#888',
                            borderRadius: '10px',
                        },
                        '::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        },
                    }} >
                    <Box>
                        message
                    </Box>

                    <Box>
                        message
                    </Box>
                    <Box>
                        message
                    </Box>
                    <Box>
                        message
                    </Box>
                    <Box>
                        message
                    </Box>
                    <Box>
                        message
                    </Box>
                    {/* {users.map((user) => <Box
                        sx={{
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            borderBottom: '1px solid black',
                            background: '#ffec41',
                            ":hover": {
                                background: '#e2cc05'
                            },
                            ":last-of-type": {
                                borderBottom: users.length > 9 ? 'none' : 'normal'
                            }
                        }}>
                        <Avatar alt='skeletonkata' sx={{ ml: '25px' }} />
                        <Typography
                            sx={{
                                color: 'black',
                                fontSize: '18px',
                                fontWeight: 700,
                            }}>
                            {user.name}
                        </Typography>
                    </Box>
                    )} */}
                </Box>
                <TextField
                    fullWidth
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    defaultValue="Normal"
                    variant="filled"
                    sx={{
                        height: '100%'
                    }}
                />
            </Box>
        </Box>
    </Navigation >
}