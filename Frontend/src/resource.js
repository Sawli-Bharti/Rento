import Footer from "./components/Footer";
import Header from "./components/Header";
import BookAppointmentModal from "./components/BookAppointmentModal";
import PropertyCard from "./components/PropertyCard";
import OwnerSidebar from "./components/OwnerSidebar";
import RenterSidebar from "./components/RenterSidebar";
import IdUpload from "./components/kyc/IdUpload";
import SelfieCapture from "./components/kyc/SelfieCapture";
import FileBox from "./components/kyc/FileBox";
import BookingCard from "./components/BookingCard";

import RenterHome from "./pages/renter/RenterHome";
import PropertBySearch from "./pages/renter/PropertBySearch";
import PropertyDetails from "./pages/renter/PropertyDetails";
import RenterOverview from "./pages/renter/profile/RenterOverview";
import MyAppointments from "./pages/renter/profile/MyAppointments";
import MyBookings from "./pages/renter/profile/MyBookings";
import Profile from "./pages/renter/profile/Profile";
import SavedProperties from "./pages/renter/profile/SavedProperties";
import Security from "./pages/renter/profile/Security";
import MyRentals from "./pages/renter/profile/MyRentals";
import RentalHistory from "./pages/renter/profile/RentalHistory";


import OwnerHome from "./pages/owner/OwnerHome";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerKyc from "./pages/owner/OwnerKyc";
import AddProperty from "./pages/owner/AddProperty";
import MyProperties from "./pages/owner/MyProperties";
import Appointments from "./pages/owner/Appointments";
import Bookings from "./pages/owner/Bookings";
import Properties from "./pages/admin/Properties";
import { useAuth ,AuthProvider} from "./context/AuthContext";
import Login from "./auth/Login";
import FeatureCard from "./components/FeatureCard";
import SignUp from "./auth/SignUp";
import HomeLayout from "./layout/HomeLayout";
import OwnerHomeLayout from "./layout/OwnerHomeLayout";
import StatCard from "./components/StatCard";
import ProfileDropdown from "./components/ProfileDropdown";
import HeaderOwner from "./components/HeaderOwner";
import OwnerSellRentMenu from "./components/OwnerSellRentMenu";
import ImagePreviewModal from "./components/ImagePreviewModal";
import AppointmentCard from "./components/AppointmentCard";
import RentalCard from "./components/RentalCard";


import AdminLayout from "./layout/AdminLayout";
import OwnerDashboardLayout from "./layout/OwnerDashboardLayout";
import RenterDashboardLayout from "./layout/RenterDashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import OwnerList from "./pages/admin/OwnerList";
import RenterList from "./pages/admin/RenterList";
import PendingKycList from "./pages/admin/PendingKycList";
import AdminKycView from "./pages/admin/AdminKycView";


export {Footer,Header,HeaderOwner,PropertyCard,OwnerSidebar,RenterSidebar,RenterHome,PropertBySearch,PropertyDetails,RenterOverview,OwnerHome,OwnerDashboard,OwnerKyc,AddProperty,MyProperties,Properties,useAuth,AuthProvider,Login,SignUp,FeatureCard,HomeLayout,OwnerHomeLayout,OwnerDashboardLayout, AdminLayout,RenterDashboardLayout,StatCard,OwnerSellRentMenu,ProfileDropdown,Dashboard,Users,OwnerList,RenterList,IdUpload,SelfieCapture,FileBox,PendingKycList,AdminKycView,ImagePreviewModal,MyAppointments,MyBookings,Profile,SavedProperties,Security,BookAppointmentModal,Appointments,Bookings,AppointmentCard,MyRentals,RentalHistory,BookingCard,RentalCard};


