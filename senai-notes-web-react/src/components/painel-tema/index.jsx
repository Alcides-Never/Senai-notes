import './painel-tema.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';

function PainelTema() {

    const [flagDarkMode, setFlagDarkMode] = useState();

    useEffect(() => {

        let modoEscuro = localStorage.getItem("dark-mode");
        if (modoEscuro === "true") {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }

    }, []);

    const clickDarkMode = () => {

        setFlagDarkMode(true);

        document.body.classList.add("dark-mode");

        localStorage.setItem("dark-mode", true);

        window.location.reload();

    }

    const clickLigthMode = () => {

        setFlagDarkMode(false);

        document.body.classList.remove("dark-mode");

        localStorage.setItem("dark-mode", false);

    }

    return (
        <>
            <nav className="configuracao">
                <h1 className='titulo-color'>Color Theme</h1>
                <p className='descricao'>Escolha a cor do seu tema</p>
                <button className='botao-notes' onClick={() => clickLigthMode()}>
                    <FontAwesomeIcon icon={faSun} className='icon' />
                    Ligth Mode
                </button>
                <button className='botao-notes' onClick={() => clickDarkMode()}>
                    <FontAwesomeIcon icon={faCircleHalfStroke} className='icon' />
                    Dark Mode
                </button>
            </nav>

        </>
    )
}

export default PainelTema