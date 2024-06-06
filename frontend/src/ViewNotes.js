import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const CardStyled = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  height: 140,
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
}));

function ViewNotes({ API_URL }) {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${API_URL}/notes?userId=exampleUserId`);
        setNotes(response.data);
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        setError('Failed to fetch notes. Please try again later.');
      }
    };

    fetchNotes();
  }, [API_URL]);

  const handleNavigateToNotes = () => {
    navigate("/notes");
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h4">View Notes</Typography>
        <Button variant="contained" color="primary" onClick={handleNavigateToNotes}>Create Note</Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {notes.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note.noteId}>
            <CardStyled>
              <CardActionArea>
                {note.imageUrl && (
                  <CardMediaStyled
                    component="img" // Set component to 'img' to render <img> tag
                    src={note.imageUrl} // Use imageUrl as src
                    title={note.title}
                  />
                )}
                <CardContentStyled>
                  <Typography variant="h6" component="h3">{note.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{note.content}</Typography>
                </CardContentStyled>
              </CardActionArea>
            </CardStyled>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ViewNotes;
