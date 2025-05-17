import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './assets/Logo.svg';
import Feed from './assets/feed.svg';
import FeedAtivo from './assets/feedAtivo.svg';
import Account from './assets/account_circle.svg';
import AccountAtivo from './assets/account_circle_ativo.svg';
import Info from './assets/info.svg';
import InfoAtivo from './assets/info_ativo.svg';
import Logout from './assets/logout.svg';
import './style.css';

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
            {/* TOPO fixo no mobile */}
            <div className="top-bar">
                <img src={Logo} alt="logo do code connect" className="logo-mobile" />
                <button
                    className="top-bar__btn"
                    onClick={() => navigate('/publish')}
                >
                    Publicar
                </button>
            </div>

            {/* SIDEBAR (lateral no desktop, rodapé no mobile) */}
            <aside>
                {/* Logo visível apenas no desktop */}
                <img src={Logo} alt="logo do code connect" className="logo-desktop" />

                <nav>
                    <ul className="lista-sidebar">
                        {/* Botão Publicar (só no desktop) */}
                        <li className="item__link-publicacao-wrapper">
                            <a
                                onClick={() => navigate('/publish')}
                                className="item__link-publicacao"
                            >
                                Publicar
                            </a>
                        </li>

                        {/* Feed */}
                        <li>
                            <a
                                onClick={() => navigate('/feed')}
                                className={`item__link ${currentPath === '/feed' ? 'item__link-ativo' : ''}`}
                            >
                                <img
                                    src={currentPath === '/feed' ? FeedAtivo : Feed}
                                    alt='Feed'
                                />
                                <span>Feed</span>
                            </a>
                        </li>

                        {/* Perfil */}
                        <li>
                            <a
                                onClick={() => navigate('/perfil')}
                                className={`item__link ${currentPath === '/perfil' ? 'item__link-ativo' : ''}`}
                            >
                                <img
                                    src={currentPath === '/perfil' ? AccountAtivo : Account}
                                    alt='Perfil'
                                />
                                <span>Perfil</span>
                            </a>
                        </li>

                        {/* Sobre nós */}
                        <li>
                            <a
                                onClick={() => navigate('/sobre-nos')}
                                className={`item__link ${currentPath === '/Sobre_nos' ? 'item__link-ativo' : ''}`}
                            >
                                <img
                                    src={currentPath === '/Sobre-nos' ? InfoAtivo : Info}
                                    alt='Sobrenós'
                                />
                                <span>Sobre nós</span>
                            </a>
                        </li>

                        {/* Sair */}
                        <li>
                            <a
                                onClick={handleLogout}
                                className="item__link"
                            >
                                <img src={Logout} alt='Sair' />
                                <span>Sair</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
}
