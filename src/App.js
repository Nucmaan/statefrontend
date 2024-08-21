import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Login from "./Auth/Login";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Register from "./Auth/Register";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import ViewAll from "./Pages/ViewAll";
import ViewBlog from "./Pages/ViewBlog";
import ViewProperty from "./Pages/ViewProperty";
import UserDashboard from "./Renter/UserDashboard";
import Profile from "./Renter/Profile";
import Rent from "./Pages/Rent";
import Buy from "./Pages/Buy";
import SinglePage from "./Pages/SinglePage";
import ForgetPassword from "./Pages/FogertPassword";
import ResetPassword from "./Pages/ResetPassword";
import PrivateRoute from "./Components/PrivateRoute";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminProfile from "./Admin/AdminProfile";
import AdminSidebar from "./Admin/AdminSidebar";
import EditAdminProfile from "./Admin/EditAdminProfile";
import UserList from "./Admin/UserList";
import AddUser from "./Admin/AddUser";
import EditUser from "./Admin/EditUser";
import Listings from "./Admin/Listings";
import EditListing from "./Admin/EditListing";
import EditUserProfile from "./Renter/EditUserProfile";
import ProtectedUserRoute from "./Renter/ProtectedUserRoute";
import AgentDashboard from "./Agent/AgentDashboard";
import AgentProfile from "./Agent/AgentProfile";
import EditAgentProfile from "./Agent/EditAgentProfile";
import ProtectedAgentRoute from "./Agent/ProtectedAgentRoute";
import AgentPropertyList from "./Agent/AgentPropertyList";
import AgentAddListing from "./Agent/AgentAddListing";
import AgentEditListing from "./Agent/AgentEditListing";
import AgentBookings from "./Agent/AgentBookings";
import UserBooking from "./Renter/UserBooking";
import HouseInformaton from "./Renter/HouseInformaton";
import AgentViewHouseDetails from "./Agent/AgentViewHouseDetails";
import EditBooking from "./Agent/EditBooking";
import AddContract from "./Agent/AddContract";
import MyContract from "./Agent/MyContract";
import RenterContracts from "./Renter/RenterContracts";
import ReadContract from "./Agent/ReadContract";
import RenterReadContract from "./Renter/RenterReadContract";
import EditContract from "./Agent/EditContract";
import RenterBills from "./Renter/RenterBills";
import RenterPayments from "./Renter/RenterPayments";
import BillsAgent from "./Agent/BillsAgent";
import AgentPayments from "./Agent/AgentPayments";
import AddBills from "./Agent/AddBills";
import UpdateBill from "./Agent/UpdateBill";
import PayBillNow from "./Renter/PayBillNow";
import RenterInvoice from "./Renter/RenterInvoice";
import AgentBills from "./Agent/AgentBills";
import AgentInvoice from "./Agent/AgentInvoice";
import SocialLinks from "./Admin/SocialLinks";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsConditions from "./Components/TermsConditions";
import EditSocial from "./Admin/EditSocial";
import AgentBlog from "./Agent/AgentBlog";
import EditBlogPost from "./Agent/EditBlogPost";
import AboutUsPage from "./Admin/AboutUsPage";
import AddAboutUsPage from "./Admin/AddAboutUsPage";
import EditAboutUsPage from "./Admin/EditAboutUsPage";
import HeroImage from "./Admin/HeroImage";
import AddHeroImage from "./Admin/AddHeroImage";
import EditHeroImage from "./Admin/EditHeroImage";
import TestPreview from "./Admin/TestPreview";
import PropertyListCard from "./Pages/PropertyListCard";
import PublicListProperty from "./Pages/PublicListProperty";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={3000}
      variant="default"
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<SinglePage />} />
          <Route path="/listings" element={<PropertyListCard />} />
          <Route path="/AllListings" element={<PublicListProperty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/Rent" element={<Rent />} />
          <Route path="/Buy" element={<Buy />} />
          <Route path="/ViewAll" element={<ViewAll />} />
          <Route path="/ViewBlog/:id" element={<ViewBlog />} />
          <Route path="/ViewSingleProperty/:id" element={<ViewProperty />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/ResetPassword/:token" element={<ResetPassword />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />

          <Route element={<PrivateRoute />}>
          
            <Route element={<ProtectedUserRoute />}>
              <Route path="/user/Dashboard" element={<UserDashboard />} />
              <Route path="/user/Profile" element={<Profile />} />
              <Route
                path="/user/profile/edit-profile/:id"
                element={<EditUserProfile />}
              />
              <Route path="/user/Bookings" element={<UserBooking />} />
              <Route path="/user/Bookings/view-House-Information/:id" element={<HouseInformaton />} />
              <Route path="/user/contract" element={<RenterContracts />} />
              <Route path="/user/contract/read-contract/:id" element={<RenterReadContract />} />
              <Route path="/user/Bills" element={<RenterBills />} />
              <Route path="/user/Payments" element={<RenterPayments />} />
              <Route path="/user/Bills/Pay-Now/:id" element={<PayBillNow />} />
              <Route path="/user/Payments/invoice/:id" element={<RenterInvoice />} />
              
            </Route>

            <Route element={<ProtectedAgentRoute />}>
              <Route path="/agent/Dashboard" element={<AgentDashboard />} />
              <Route path="/agent/profile" element={<AgentProfile />} />
              <Route
                path="/agent/profile/edit-profile/:id"
                element={<EditAgentProfile />}
              />
              <Route path="/agent/property-list" element={<AgentPropertyList />} />
              <Route path="/agent/property-list/add-property" element={<AgentAddListing />} />
            </Route>
            <Route path="/agent/property-list/edit-property/:id" element={<AgentEditListing />} />
            <Route path="/agent/Bookings" element={<AgentBookings />} />
            <Route path="/agent/Bookings/House-Details/:id" element={<AgentViewHouseDetails />} />
            <Route path="/agent/Booking/update-Booking/:id" element={<EditBooking />} />
            <Route path="/agent/Booking/Add-Contract/:id" element={<AddContract />} />
            <Route path="/agent/contract" element={<MyContract />} />
            <Route path="/agent/contract/Read-contract/:id" element={<ReadContract />} />
            <Route path="/agent/contract/Edit-contract/:id" element={<EditContract />} />
            <Route path="/agent/Bills-List" element={<BillsAgent />} />
            <Route path="/agent/Payments" element={<AgentPayments />} />
            <Route path="/agent/Bills/create-Bill/:id" element={<AddBills />} />
            <Route path="/agent/Bills/update-Bill/:id" element={<UpdateBill />} />
            <Route path="/agent/Bills/" element={<AgentBills />} />
            <Route path="/agent/Bills/Invoice/:id" element={<AgentInvoice />} />
            <Route path="/agent/Blog" element={<AgentBlog />} />
            <Route path="/agent/Blog/Edit-Blog/:id" element={<EditBlogPost />} />
    
          </Route>

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route
            path="/admin/profile/edit/:id"
            element={<EditAdminProfile />}
          />
          <Route path="/AdminSidebar" element={<AdminSidebar />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/users/add-new-user" element={<AddUser />} />
          <Route path="/admin/users/edit-user/:id" element={<EditUser />} />
          
          <Route path="/admin/heroImage" element={<HeroImage />} />
          <Route path="/admin/heroImage/addHeroImage" element={<AddHeroImage />} />
          <Route path="/admin/heroImage/EditHeroImage/:id" element={<EditHeroImage />} />

          <Route path="/admin/social-Media-Links" element={<SocialLinks />} />
          <Route path="/admin/Social-Media-Links/:id" element={<EditSocial />} />
          <Route path="/admin/listing" element={<Listings />} />
          <Route path="/admin/aboutuspage" element={<AboutUsPage />} />
          <Route path="/admin/aboutuspage/addsection" element={<AddAboutUsPage />} />
          <Route path="/admin/aboutuspage/editsection/:id" element={<EditAboutUsPage />} />
          <Route path="/admin/test" element={<TestPreview />} />
          
          <Route
            path="/admin/listing/edit-listing/:id"
            element={<EditListing />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
