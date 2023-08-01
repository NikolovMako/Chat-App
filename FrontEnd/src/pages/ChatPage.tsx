import React, { useEffect, useState, useRef } from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import Navigation from "../components/Navigation";
import Message from "../components/Message";
import axios from 'axios';
import { setUsersService } from "../services/setUsers";
import { useUser } from "../hooks/useUser";
import { io } from "socket.io-client"

const url = 'http://localhost:5000'

export default function ChatPage() {
    const [users, setUsers] = useState<{ id: string; name: string }[]>([])
    const [messages, setMessages] = useState<{
        fromSelf: boolean;
        message: string;
        createdAt: string;
    }[]>([])
    const [selectedUser, setSelectedUser] = useState<{
        id: string;
        name: string;
    } | undefined>(undefined)
    const [text, setText] = useState<string>('')
    const socket = io(`${url}`, {
        reconnectionDelayMax: 10000,
    });
    const { user } = useUser()
    const chatRef = useRef(undefined)

    useEffect(() => {
        if (chatRef.current) {
            // @ts-expect-error
            chatRef.current.scrollTo({ top: chatRef.current.scrollHeight + chatRef.current.clientHeight, behaviour: 'smooth' })
        }
    }, [chatRef.current, messages])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/users`)
                const duplicate = response.data?.users.filter((item: { _id: string; username: string }) => item?._id !== user.id)
                setUsers(setUsersService(duplicate))
                setSelectedUser(duplicate[0]?.username)
            } catch (Err) {
                console.log(Err, 'error')
            }
        }
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.post(`${url}/users/messages`, {
                sender: user.id,
                to: selectedUser?.id
            })
            setMessages(response?.data)
        } catch (Err) {
            console.log(Err, 'error')
        }
    }

    useEffect(() => {
        if (selectedUser?.id && selectedUser.name) {
            fetchData()
        }
    }, [selectedUser])

    const sendMessage = async () => {
        try {
            const response = await axios.post(`${url}/users/message`, {
                message: text,
                sender: user.id,
                to: selectedUser?.id
            })
            if (response) {
                socket.emit('send-msg', {
                    message: text,
                    sender: user.id,
                    to: selectedUser?.id,
                    createdAt: new Date().toISOString()
                })
                setMessages([...messages, { fromSelf: true, message: text, createdAt: new Date().toISOString() }])
                setText('')
            }
        } catch (Err) {
            console.log(Err, 'error')
        }
    }

    const sendHandler = (value: string) => {
        if (value) {
            sendMessage()
        }
    }

    socket.on('msg-receive', (data: {
        message: string;
        sender: string;
        to: string;
        createdAt: string;
    }) => {
        if (data.sender !== user?.id) {
            setMessages([...messages, { fromSelf: false, message: data.message, createdAt: data.createdAt }])
        }
    })

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
                        key={user.id}
                        component='div'
                        onClick={() => setSelectedUser(user)}
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
                        {`To: ${selectedUser?.name || ''}`}
                    </Typography>
                </Box>
                {messages.length > 0 || selectedUser?.id ?
                    <Box
                        ref={chatRef}
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
                        <Box className="messages" sx={{
                            padding: '10px',
                            background: '#ddddf7',
                        }}>
                            {messages.map((item, idx) => <Message
                                owner={!item.fromSelf}
                                message={item.message}
                                createdAt={item.createdAt}
                                selectedUser={selectedUser?.name || 'T'}
                                user={user.name || 'U'}
                                key={`${idx + item.message + item.createdAt}`}
                            />)}
                        </Box>
                    </Box>
                    : <Box height='45vh' display='flex' justifyContent='center' alignItems='center' width='100%'>Loading or Not Selected</Box>}
                <Box display='flex'>
                    <TextField
                        fullWidth
                        hiddenLabel
                        placeholder="Type"
                        id="filled-hidden-label-normal"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        variant="filled"
                        sx={{
                            height: '100%'
                        }}
                    />
                    <Button type='button' variant="contained" onClick={() => sendHandler(text)}>
                        Send
                    </Button>
                </Box>
            </Box>
        </Box>
    </Navigation >
}