import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Container, Grid } from '@mui/material';

function NoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageData, setImageData] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setImageData(base64String); // Set the base64 image data
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(imageData);
    const formData = {
      title: title,
      content: content,
      image: imageData 
    };

    try {
      const response = await axios.post(
        'https://kcp9349we3.execute-api.us-east-1.amazonaws.com/prod/notes?userId=exampleUserId',
        formData
      );
      setMessage(response.data.message);
      setTitle('');
      setContent('');
      setImageData('');
    } catch (error) {
      console.error('Error:', error.response.data);
      setMessage('Failed to create note. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Create Note</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Content"
              variant="outlined"
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </Grid>
          <Grid item xs={12}>
            {imageData && <img src={imageData} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Create Note</Button>
          </Grid>
        </Grid>
      </form>
      {message && <Typography variant="body1" color="textSecondary">{message}</Typography>}
    </Container>
  );
}

export default NoteForm;
