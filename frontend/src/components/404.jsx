import { Link } from 'react-router-dom';

export default function Error404() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900/80">
            <img src="/images/logo.png" alt="Logo" className="w-20 mb-6 drop-shadow-lg" />
            <h1 className="text-5xl font-extrabold text-white mb-2 animate-fade-in">404</h1>
            <p className="text-gray-300 text-lg mb-6 text-center max-w-md animate-fade-in">
                Oups, cette page n'existe pas ou a été déplacée.
            </p>
            <Link to="/" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition duration-200 animate-fade-in">
                Retour à l'accueil
            </Link>
        </div>
    );
}