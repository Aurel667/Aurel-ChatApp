import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { AuthProvider } from './stores/AuthContext';
import { RoomsProvider } from './stores/RoomsContext';
import { MessageProvider } from './stores/MessagesContext';

export default function App() {
  console.log("Aurel KOLANI made this one")
  return (
    <AuthProvider>
      <RoomsProvider>
        <MessageProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </MessageProvider>
      </RoomsProvider>
    </AuthProvider>
  );
}

