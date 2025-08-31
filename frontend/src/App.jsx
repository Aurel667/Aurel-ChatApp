import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { AuthProvider } from './stores/AuthContext';
import { RoomsProvider } from './stores/RoomsContext';

export default function App() {
  return (
    <AuthProvider>
      <RoomsProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </RoomsProvider>
    </AuthProvider>
  );
}

