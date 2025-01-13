import Logo from './assets/Logo.svg';
import Feed from './assets/feed.svg';
import Account from './assets/account_circle.svg';
import Info from './assets/info.svg';
import Logout from './assets/Logout.svg';
import './style.css';


export default function sidebar(){
    return(
        <aside>
            <img src={Logo} alt="logo do code conect" />
            <nav>
                <ul className='lista-sidebar'>
                    <li>
                        <a href= '#' className='item__link-publicacao'>Publicar</a>
                    </li>
                    <li>
                        <a href="#" className='item__link item__link-ativo'>
                            <img src={Feed} alt=''/>
                            <span>Feed</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className='item__link'>
                            <img src={Account} alt=''/>
                            <span>Perfil</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className='item__link'>
                            <img src={Info} alt=''/>
                            <span>Sobre nós</span>
                         </a>
                    </li>
                    <li>
                        <a href="#" className='item__link'>
                            <img src={Logout} alt=''/>
                            <span>Sair</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    )

}