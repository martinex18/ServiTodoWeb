import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/AppRoutes.jsx'
import { AuthProvider } from './context/authContext.jsx';

function App() {

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
