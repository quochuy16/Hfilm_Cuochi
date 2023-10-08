import React from "react";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import './App.css'
import Home from './views/Home'
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Categories from "./views/Categories";
import Nation from "./views/Nation";
import Favourite from "./views/Favourite";
import Series from "./views/Series";
import ForgotPass from "./views/ForgotPassword";
import Video from "./views/Video";
import AddVideo from "./views/AddVideo";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/sign-in" element={<Signin />}/>
          <Route path="/sign-up" element={<Signup />}/>
          <Route path="/categories" element={<Categories />}/>
          <Route path="/nation" element={<Nation />}/>
          <Route path="/favourite" element={<Favourite />}/>
          <Route path="/allFilm?search=:id" element={<Series />}/>
          <Route path="/allFilm" element={<Series />}/>
          <Route path="/forgotPassword" element={<ForgotPass />}/>
          <Route path="/film/:id" element={<Video />}/>
          <Route path="/addvideo" element={<AddVideo />}/>

        </Routes>
      </BrowserRouter>
  );
} 

export default App;