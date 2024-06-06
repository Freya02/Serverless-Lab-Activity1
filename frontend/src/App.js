import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Notes from './Notes';
import ViewNotes from './ViewNotes';

function App() {
    const API_URL = 'https://kcp9349we3.execute-api.us-east-1.amazonaws.com/prod';

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login API_URL={API_URL} />} />
                <Route path="/register" element={<Register API_URL={API_URL} />} />
                <Route path="/notes" element={<Notes API_URL={API_URL} />} />
                <Route path="/view-notes" element={<ViewNotes API_URL={API_URL} />} />
                <Route path="/" element={<Register API_URL={API_URL} />} />
            </Routes>
        </Router>
    );
}

export default App;
