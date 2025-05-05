import githubIcon from '../../assets/imagens/Github.svg';
import googleIcon from '../../assets/imagens/Google.svg';

const icones = {
  Github: githubIcon,
  Google: googleIcon,
};
export default function ItemRedesSociais({ link, nome }) {
    return (
      <li>
        <a href={link}>
          <img src={icones[nome]} alt={`ícone do ${nome}`} />
          {nome}
        </a>
      </li>
    );
  }
