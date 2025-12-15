import React , {lazy} from "react";
import { Route } from "react-router-dom";
import TrainerManagementPage from "../../pages/Dashboard/Admins/TrainerManagementPage";
import TrainerDetailsPage from "../../pages/Dashboard/Admins/TrainerDetails";
import EditStudioPage from "../../pages/Dashboard/Admins/EditStudioPage";
import AddBatchAdminPage from "../../pages/Dashboard/Admins/AddBatchAdminPage";
import BatchsListAdminPage from "../../pages/Dashboard/Admins/BatchsListAdminPage";
import EditBatchAdminPage from "../../pages/Dashboard/Admins/EditBatchAdminPage";
import StudioList from "../../pages/Dashboard/Admins/StudioList";
import AddStudioForm from "../../pages/Dashboard/Admins/AddStudioForm";
import AddMemberToBatchForm from "../../pages/Dashboard/Admins/AddMemberToBatchForm";
import ViewStudioPage from "../../pages/Dashboard/Admins/ViewStudioPage";
import BatchViewAdminPage from "../../pages/Dashboard/Admins/BatchViewAdminPage";
import AddMemberAdminPage from "../../pages/Dashboard/Admins/AddMemberAdminPage";
import MembersListAdminPage from "../../pages/Dashboard/Admins/MembersListAdminPage";
import MemberViewAdminPage from "../../pages/Dashboard/Admins/MemberViewAdminPage";
import MemberEditAdminPage from "../../pages/Dashboard/Admins/MemberEditAdminPage";
import BatchMembersListAdminPage from "../../pages/Dashboard/Admins/BatchMembersListAdminPage";
import InvoiceListAdminPage from "../../pages/Dashboard/Admins/InvoiceListAdminPage";
import AllEnquiriesList from "../../pages/Dashboard/Admins/AllEnquiriesList";
import EnquiryViewAdminPage from "../../pages/Dashboard/Admins/EnquiryViewAdminPage";
// Lazy load admin pages
const AdminDashboard = lazy(() => import("../../pages/Dashboard/Admins/AdminDashboard"));

const AdminRoutes = () => {
  return (
    <>
      <Route index element={
        <AdminDashboard/>
      } />
      <Route path="register-trainer" element={<h1>
        This feature is under development
      </h1>} />
      <Route path="trainers" element={
        <TrainerManagementPage/>
      } />
      <Route path="trainer/:trainerId" element={
        <TrainerDetailsPage/>
      } />
      <Route path="studios" element={
        <StudioList/>
      } />
      <Route path="studios/add" element={
        <AddStudioForm/>
      } />


      <Route path="studio/edit/:studioId" element={<EditStudioPage />} />
      <Route path="studio/view/:studioId" element={<ViewStudioPage />} />



      <Route path="add-batch" element={
        <AddBatchAdminPage/>
      } />
       <Route path="batch-list" element={
        <BatchsListAdminPage/>
      } />
      <Route path="batches/add-member" element={<AddMemberToBatchForm />} />
      <Route path="batch-member-list" element={<BatchMembersListAdminPage />} />





         <Route path="batches/edit/:studioId" element={<EditBatchAdminPage />} />
         <Route path="batches/view/:batchId" element={<BatchViewAdminPage />} />


      <Route path="register-member" element={
        <AddMemberAdminPage/>
      } />



      <Route path="members" element={
        <MembersListAdminPage/>
      } />

         <Route path="members/view/:memberId" element={<MemberViewAdminPage />} />
         <Route path="members/edit/:memberId" element={<MemberEditAdminPage />} />

 <Route path="enquiries" element={<AllEnquiriesList />} />
     <Route path="enquiries/view/:enquiryId" element={<EnquiryViewAdminPage />} />


<Route  path="invoice/list"  element = {<InvoiceListAdminPage/>}/>





      <Route path="centers" element={<h1>Centers</h1>} />
      <Route path="bookings" element={<h1>Reports & Analytics</h1>} />
      
    </>
  );
};

export default AdminRoutes;
