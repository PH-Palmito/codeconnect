import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './assets/Logo.svg';
import Feed from './assets/feed.svg';
import FeedAtivo from './assets/feedAtivo.svg';
import Account from './assets/account_circle.svg';
import AccountAtivo from './assets/account_circle_ativo.svg';
import Info from './assets/info.svg';
import InfoAtivo from './assets/info_ativo.svg';
import Logout from './assets/Logout.svg';
import './style.css';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/codeconnect/');
    }

    return (
        <aside>
            <img src={Logo} alt="logo do code connect" />
            <nav>
                <ul className='lista-sidebar'>
                    <li>
                        <a
                            onClick={() => navigate('/codeconnect/publish')}
                            className='item__link-publicacao'
                        >
                            Publicar
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => navigate('/codeconnect/feed')}
                            className={`item__link ${currentPath === '/codeconnect/feed' ? 'item__link-ativo' : ''}`}
                        >
                            <img
                                src={currentPath === '/codeconnect/feed' ? FeedAtivo : Feed}
                                alt='Feed'
                            />
                            <span>Feed</span>
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => navigate('/codeconnect/perfil')}
                            className={`item__link ${currentPath === '/codeconnect/perfil' ? 'item__link-ativo' : ''}`}
                        >
                            <img
                                src={currentPath === '/codeconnect/perfil' ? AccountAtivo : Account}
                                alt='Perfil'
                            />
                            <span>Perfil</span>
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => navigate('/codeconnect/Sobre_nos')}
                            className={`item__link ${currentPath === '/codeconnect/Sobre_nos' ? 'item__link-ativo' : ''}`}
                        >
                            <img
                                src={currentPath === '/codeconnect/Sobre_nos' ? InfoAtivo : Info}
                                alt='Sobre nós'
                            />
                            <span>Sobre nós</span>
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={handleLogout}
                            className='item__link'
                        >
                            <img src={Logout} alt='Sair' />
                            <span>Sair</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
