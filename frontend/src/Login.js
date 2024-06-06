import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

function Login({ API_URL }) {
    const [userId, setUserId] = useState('');
    const [passWord, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_URL}/users/authenticate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, passWord }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                localStorage.setItem('userId', userId);
                navigate('/view-notes');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while logging in.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                mt={5}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form>
                    <TextField
                        label="User ID"
                        variant="outlined"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        fullWidth
                        margin="normal"
                        autoComplete="username"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={passWord}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        autoComplete="current-password"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
                {message && (
                    <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
            </Box>
        </Container>
    );
}

export default Login;
