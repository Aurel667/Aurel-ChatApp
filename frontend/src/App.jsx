import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { AuthProvider } from './stores/AuthContext';
import { RoomsProvider } from './stores/RoomsContext';
import { MessageProvider } from './stores/MessagesContext';
import AutoAuth from './stores/AutoAuth';
import NotificationsService from './services/NotificationsService';

export default function App() {
  console.info("Aurel KOLANI made this one")
  return (
    //Provider de session utilisateur
    <AuthProvider>
      {/* Provider des rooms */}
      <RoomsProvider>
        {/* Provider de messages */}
        <MessageProvider>

          {/* Routes */}
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          
          {/* Services */}
          <AutoAuth />
          <NotificationsService />

        </MessageProvider>
      </RoomsProvider>
    </AuthProvider>
  );
}

