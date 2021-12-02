import React from "react";
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from "react-router-dom";
import { Container, Grid, Button } from '@mui/material';

import Characters from "./Characters";
import MultipleCharactersList from "./MultipleCharactersList";

export default function App() {
  return (
    <Router>
      <Container maxWidth="md" >
        <Grid container
          justifyContent="center"
          alignItems="center"
        >
          <Button component={RouterLink} to="/">Home</Button>
          <Button component={RouterLink} to="/characters">Characters</Button>
          <Button component={RouterLink} to="/multiple-characters-list">Multiple Characters List</Button>

        </Grid>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/multiple-characters-list" element={<MultipleCharactersList />} />

        </Routes>
      </Container >
    </Router >
  );
}



function Home() {
  return <h2>Hello</h2>;
}
