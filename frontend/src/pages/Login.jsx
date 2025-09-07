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
        <div className="flex items-center justify-center min-h-screen bg-neutral-900 bg-fixed bg-[url('/images/svg/doodle-brand.svg')]">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-neutral-800/90 rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-neutral-700 animate-fade-in">
                <div className="flex flex-col items-center gap-2 mb-2">
                    <img src="/images/logo.png" alt="AurelChatApp" className="w-20 h-20 mb-1" />
                    <h2 className="text-2xl font-bold text-neutral-100 text-center tracking-tight">Connexion</h2>
                </div>
                <div className="flex flex-col gap-4">
                    <input
                        className="border border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 rounded-lg px-4 py-2 w-full text-neutral-100 placeholder:text-neutral-400 transition-all duration-200 outline-none bg-neutral-900/80"
                        name="username"
                        placeholder="Nom d'utilisateur"
                        value={state.username}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        className="border border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 rounded-lg px-4 py-2 w-full text-neutral-100 placeholder:text-neutral-400 transition-all duration-200 outline-none bg-neutral-900/80"
                        name="password"
                        type="password"
                        placeholder="Mot de passe"
                        value={state.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {state.error && <div className="text-red-500 text-sm text-center animate-shake">{state.error}</div>}
                <button
                    className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2 rounded-lg shadow transition-all duration-200 w-full disabled:opacity-60 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={state.loading}
                >
                    {state.loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
                            Chargement...
                        </span>
                    ) : "Se connecter"}
                </button>
                <div className="flex justify-center mt-2">
                    <a className="text-blue-400 hover:underline text-sm" href="/register">S'inscrire</a>
                </div>
            </form>
        </div>
    );
}
