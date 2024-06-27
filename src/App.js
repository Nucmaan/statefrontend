import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Register from "./Auth/Register";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import PropertyList from "./Pages/PropertyList";
import Herro from "./Components/Herro";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Herro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/Property" element={<PropertyList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
