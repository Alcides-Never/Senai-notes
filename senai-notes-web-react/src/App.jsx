
import Login from "./pages/login";
import Forgot from "./pages/forgot";
import Reset from "./pages/reset";
import Usuario from "./pages/usuario";
import Notes from "./pages/notes";
import Settings from "./pages/settings";

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/settings" element={<Settings />} />

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
