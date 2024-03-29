import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { AuthContext, AuthProvider } from './provider';
import { useContext } from 'react';


function App() {

  const ProtectedRoute = ({ children }) => {
      const { loading, user } = useContext(AuthContext);
      if (loading) {
        return <div className='flex h-screen w-full justify-center items-center'><span className="loading loading-dots loading-lg"></span></div>;
      }
      if (user) {
        return children;
      }
    
      return <Navigate to="/signin" />;
  }
  return (
  <AuthProvider>
    <BrowserRouter>
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
           }/>
           <Route path="/signup" element={<Register />} />
           <Route path= "/signin" element={<Signin/>} />
           <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  </AuthProvider>
  ) ;
}


export default App
