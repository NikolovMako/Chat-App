import React from "react";
import { Avatar, Box } from "@mui/material";

export default function Message({ owner, message, createdAt, user, selectedUser }: {
    owner: boolean,
    message: string,
    createdAt: string,
    user: string,
    selectedUser: string
}) {
    const time = new Date(createdAt)
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: owner ? 'row-reverse' : 'initial',
            gap: '20px',
            mb: '20px'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                color: "gray",
                fontWeight: 300,
                alignItems: 'center',
            }}>
                <Avatar
                    sx={{
                        width: 36, height: 36
                    }}>
                    {owner ? user.charAt(0).toUpperCase() : selectedUser.charAt(0).toUpperCase()}
                </Avatar>
                <Box>{`${time.getHours()}:${(time.getMinutes() < 10 ? '0' : '') + time.getMinutes()}:${time.getSeconds()}`}</Box>
            </Box>
            <Box sx={{
                maxWidth: '80%',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                gap: '10px',
                background: owner ? '#8da4f1' : 'white',
                color: owner ? 'white' : 'initial',
                padding: '10px 20px',
                borderRadius: owner ? '10px 0px 10px 10px' : '0px 10px 10px 10px'
            }}>
                {message || ''}
            </Box>
        </Box>
    )
}