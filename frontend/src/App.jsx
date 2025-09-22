
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import Blog from '../src/pages/Blog'
import About from '../src/pages/About'
import Contact from '../src/pages/Contact'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import Dashboard from '../src/pages/Dashboard'
import Creator from '../src/pages/Creator'
import { useAuth } from './context/Authprovider'
import { Toaster } from 'react-hot-toast';
import UpdateBlog from './dashboard/UpdateBlog'
import Blogdetails from './pages/Blogdetails'
import Notfound from './pages/Notfound'

function App() {
  const location=useLocation();
  const hideNAvbarFooter =['/login','/register','/dashboard'].includes(location.pathname);

  const {blogs}=useAuth();
  // console.log(blogs);

  return (
    <div>
{!hideNAvbarFooter &&  <Navbar />}
{/* definig routes */}
<Routes>
<Route exact path='/' element={<Home/>}/>
<Route exact path='/blogs' element={<Blog/>}/>
<Route exact path='/about' element={<About/>}/>
<Route exact path='/contact' element={<Contact/>}/>
<Route exact path='/creator' element={<Creator/>}/>
<Route exact path='/login' element={<Login/>}/>
<Route exact path='/register' element={<Register/>}/>
<Route exact path='/dashboard' element={<Dashboard/>}/>

<Route path="/blog/:id" element={<Blogdetails />} />
{/*update page route */}
<Route exact path='/blog/update/:id' element={<UpdateBlog/>}/>

{/* 404 page not found route */}
<Route path="*" element={<Notfound/>}/>



</Routes>
<Toaster />

{ !hideNAvbarFooter && <Footer/>}

    </div>
  )
}

export default App