import { User } from "lucide-react";
import React , {lazy} from "react";
import { Route } from "react-router-dom";


// Lazy load pages
const UserDashboard = lazy(() => import("../../pages/Dashboard/Students/UserDashboard"));
const MyBooking = lazy(() => import("../../pages/Dashboard/Students/MyBooking"));
const UserProfile = lazy(() => import("../../pages/Dashboard/Students/UserProfile"));
const Trainers = lazy(() => import("../../pages/Dashboard/Students/Trainers"));



const UserRoutes = () => {
  return (
    <>
      <Route index element={
        <UserDashboard/>
      } />
      <Route path="profile" element={
        <UserProfile/>
      } />
      <Route path="bookings" element={
        <MyBooking/>
      } />

        <Route path="trainers" element={
        <Trainers/>
      } />
      <Route path="settings" element={<h1>User Settings</h1>} />
     
    </>
  );
};

export default UserRoutes;
