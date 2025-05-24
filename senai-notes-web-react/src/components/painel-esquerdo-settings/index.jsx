import './painel-esquerdo-settings.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { faArrowRight, faCircleHalfStroke, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


function PainelEsquerdoSettings({ enviarTelaSelecionada }) {

    const [tela, setTela] = useState(null);

    const clickLogout = () => {

        localStorage.clear();
        window.location.href = "/login";

    }

    const clickColorTheme = (tela) => {

        enviarTelaSelecionada(tela);

    }

    return (
        <>
            <nav className="inferior-esquerda-settings">
                <button className='botao-notes'>
                    <FontAwesomeIcon icon={faCircleHalfStroke} className='icon' onClick={() => clickColorTheme(tela)} />
                    Color Theme
                    <FontAwesomeIcon icon={faArrowRight} className='seta' />
                </button>

                <button className='botao-notes'>
                    <FontAwesomeIcon icon={faLock} className='icon' />
                    Change Password
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