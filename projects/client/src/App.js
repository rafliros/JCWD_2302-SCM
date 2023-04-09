// Import Router
import { Routes, Route} from 'react-router-dom';

// Import Navbar
import Navbar from "./components/navbar";

// Import Home
import Home from "./pages/home/home";

// Import Rooms
import Rooms from "./pages/rooms/rooms";

// Import Booking
import Booking from "./pages/booking/booking";

// Import Login
import Login from "./pages/login/login";

// Import Register
import Signup from "./pages/signup/signup";

// Import Reset

// Import Recovery

// Import Profile
import Profile from "./pages/profile/profile"

// Import Footer
import Footer from "./components/footer";

// Import Page Not Found
import Pagenotfound from "./pages/page not found/pagenotfound";


export default function App(){


  return(
    <>
      <Navbar />
        <Routes>
          <Route path='/'  element={<Home />} />
          <Route path='/rooms'  element={<Rooms />} />
          <Route path='/booking'  element={<Booking />} /> 
          <Route path='/login'  element={<Login />} />
          <Route path='/profile'  element={<Profile />} />
          <Route path='/signup'  element={<Signup />} />
          <Route path='/pagenotfound'  element={<Pagenotfound />} />
        </Routes>
      <Footer />
    </>
  )
}
