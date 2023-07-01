import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
import AuthRoutes from './routes/AuthRoutes';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/auth/*' element={<AuthRoutes />} />
        <Route path='/dashboard/*' element={<DashboardLayout />} />
        <Route path='/404' element={<NotFoundPage />} />
        <Route path='*' element={<Navigate replace to='/404' />} />
      </Routes>
    </div>
  );
}

export default App;
