import React , {lazy} from "react";
import { Route } from "react-router-dom";

// Lazy load trainer dashboard pages
const TrainerDashboard = lazy(() => import("../../pages/Dashboard/Trainers/TrainerDashboard"));
const MySchedule = lazy(() => import("../../pages/Dashboard/Trainers/MySchedule"));
const BookingRequests = lazy(() => import("../../pages/Dashboard/Trainers/BookingRequests"));
const TrainerEarnings = lazy(() => import("../../pages/Dashboard/Trainers/TrainerEarnings"));
const TrainerProfilePage = lazy(() => import("../../pages/Dashboard/Trainers/TrainerProfile"));



const TrainerRoutes = () => {
  return (
    <>
      <Route index element={
        <TrainerDashboard/>
      } />
      
      <Route path="profile" element={
        <TrainerProfilePage/>
      } />
      <Route path="schedule" element={
        <MySchedule/>
      } />
      <Route path="requests" element={
        <BookingRequests/>
      } />
      <Route path="earnings" element={
        <TrainerEarnings/>
      } />
    </>
  );
};

export default TrainerRoutes;
