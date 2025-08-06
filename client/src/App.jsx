import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import GetStarted from './pages/GetStarted';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import AddTask from './pages/AddTask';
import { EditTask } from './pages/EditTask';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import { Signup } from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<GetStarted />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/add-task" element={
                <PrivateRoute>
                  <Layout>
                    <AddTask />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/edit-task/:taskId" element={
                <PrivateRoute>
                  <Layout>
                    <EditTask />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/profile" element={
                <PrivateRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/admin" element={
                <PrivateRoute adminOnly>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </PrivateRoute>
              } />
              
              {/* Redirect to dashboard if authenticated, otherwise to get started */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
