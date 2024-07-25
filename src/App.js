import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Register from "./Auth/Register";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import PropertyList from "./Pages/PropertyList";
import ViewAll from "./Pages/ViewAll";
import ViewBlog from "./Pages/ViewBlog";
import ViewProperty from "./Pages/ViewProperty";
import UserDashboard from "./Renter/UserDashboard";
import Booking from "./Renter/Booking";
import Profile from "./Renter/Profile";
import Welcome from "./Renter/Welcome";
import Bills from "./Renter/Bills";
import Rent from "./Pages/Rent";
import Buy from "./Pages/Buy";
import SinglePage from "./Pages/SinglePage";
import EditProfile from "./Renter/EditProfile";
import Payment from "./Renter/Payment";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<SinglePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/Property" element={<PropertyList />} />
        <Route path="/Rent" element={<Rent />} />
        <Route path="/Buy" element={<Buy />} />
        <Route path="/ViewAll" element={<ViewAll />} />
        <Route path="/ViewBlog" element={<ViewBlog />} />
        <Route path="/ViewSingleProperty" element={<ViewProperty />} />

        <Route path="/UserDashboard" element={<UserDashboard />} />

        <Route path="/Booking" element={<Booking />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/WelcomeUser" element={<Welcome />} />
        <Route path="/Bills" element={<Bills />} />
        <Route path="/Payment" element={<Payment />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
