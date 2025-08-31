import { useState } from 'react';
import { register } from '../api/auth';
import { useAuth } from '../stores/AuthContext';

export default function Register() {
    const {login} = useAuth();
    const [state, setState] = useState({
        username: '', 
        password: '', 
        error: '', 
        loading: false 
    });

    const handleChange = (e) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState(prev => ({ ...prev, error: '', success: '', loading: true }));
        console.log(state)
        try {
            const user = await register({ username: state.username, password: state.password });
            if (user?.error || user?.message) throw new Error(user.error || user.message);
            login(user);
        } catch (err) {
            setState(prev => ({ ...prev,  error: err.message }));
        }
        finally {
            setState(prev => ({ ...prev,  loading: false }));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-xs">
            <h2 className="text-lg font-bold mb-4">Inscription</h2>
            <input className="border rounded px-2 py-1 w-full mb-2" name="username" placeholder="Nom d'utilisateur" value={state.username} onChange={handleChange} required />
            <input className="border rounded px-2 py-1 w-full mb-2" name="password" type="password" placeholder="Mot de passe" value={state.password} onChange={handleChange} required />
            {state.error && <div className="text-red-500 text-sm mb-2">{state.error}</div>}
            <button className="bg-blue-500 text-white px-4 py-1 rounded w-full" type="submit">
                {state.loading ? 'Chargement...' : "S'inscrire"}
            </button>
            <a className="text-black underline mt-2" href="/login">Se connecter</a>
        </form>
        </div>
    );
}
