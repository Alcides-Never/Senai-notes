import './painel-esquerdo-settings.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { faArrowRight, faCircleHalfStroke, faLock } from '@fortawesome/free-solid-svg-icons';



function PainelEsquerdoSettings({ enviarTelaSelecionada }) {


    const clickLogout = () => {

        localStorage.removeItem('meuId');
        localStorage.removeItem('meuToken');
        localStorage.removeItem('nome');
        localStorage.removeItem('dark-mode');
        
        window.location.href = "/login";

    }

    const clickColorTheme = (tela) => {
        enviarTelaSelecionada(tela);
    }

    const clickChangePassword = (tela) => {
        enviarTelaSelecionada(tela);
    }

    return (
        <>
            <nav className="inferior-esquerda-settings">
                <button className='botao-notes' onClick={() => clickColorTheme("color-theme")} >
                    <FontAwesomeIcon icon={faCircleHalfStroke} className='icon' />
                    Color Theme
                    <FontAwesomeIcon icon={faArrowRight} className='seta' />
                </button>

                <button className='botao-notes' onClick={() => clickChangePassword("change-password")} >
                    <FontAwesomeIcon icon={faLock} className='icon' />
                    Change Password
                    <FontAwesomeIcon icon={faArrowRight} className='seta' />
                </button>

                <button className='botao-notes' onClick={() => clickLogout()}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                    Logout
                </button>

            </nav>


        </>
    )
}

export default PainelEsquerdoSettings