import { useState } from 'react';
import { login as Authenticate } from '../api/auth';
import { useAuth } from '../stores/AuthContext';

export default function Login( ) {
    const {login} = useAuth();
    const [state, setState] = useState({
        username: '', 
        password: '', 
        error: '', 
        loading: false 
    });

    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState(s => ({ ...s, error: '', loading: true }));
        try {
            const user = await Authenticate({ username: state.username, password: state.password });
            if (user?.error) throw new Error(user.error || 'Erreur');
            login(user);
        } catch (err) {
            setState(s => ({ ...s, error: err.message }));
        }
        finally {
            setState(s => ({ ...s, loading: false }));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-xs">
            <h2 className="text-lg font-bold mb-4">Connexion</h2>
            <input className="border rounded px-2 py-1 w-full mb-2" name="username" placeholder="Nom d'utilisateur" value={state.username} onChange={handleChange} required />
            <input className="border rounded px-2 py-1 w-full mb-2" name="password" type="password" placeholder="Mot de passe" value={state.password} onChange={handleChange} required />
            {state.error && <div className="text-red-500 text-sm mb-2">{state.error}</div>}
            <button className="bg-blue-500 text-white px-4 py-1 rounded w-full" type="submit">
                {state.loading ? 'Chargement...' : "Se connecter"}
            </button>
            <a className="text-black underline mt-2" href="/register">S'inscrire</a>
        </form>
        </div>
    );
}
