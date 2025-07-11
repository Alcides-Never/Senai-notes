import './painel-esquerdo.css';
import logo from '../../assets/img/logo.svg';
import logoWhite from '../../assets/img/logo-white.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faFileZipper } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons/faTag';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { useEffect, useState } from 'react';


function PainelEsquerdo({ enviarTag, enviarTelaSelecionada, enviarNotaSelecionada }) {

    const [tags, setTags] = useState([]);
    const [flagDarkMode, setFlagDarkMode] = useState(false);

    const link = 'https://apisenainoteshomologacao.azurewebsites.net/'
    //const link = 'http://localhost:3000/'

    useEffect(() => {

        getTags();

        let modoEscuro = localStorage.getItem("dark-mode");
        if (modoEscuro === "true") {
            setFlagDarkMode(true);
            document.body.classList.add("dark-mode");
        }

    }, []);

    const getTags = async () => {

        let userId = localStorage.getItem("meuId");

        let response = await fetch(`${link}api/Tag/listartag/` + userId, {
            //let response = await fetch(`${link}listartag/` + userId, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        });

        if (response.ok == true) {

            let json = await response.json();

            setTags(json);
        }

    }

    const clickHome = (tela) => {

        enviarTelaSelecionada(tela);
        enviarTag(null)
        enviarNotaSelecionada(null);

        console.log("Home", tela)

        window.location.href = "/notes";

    }

    const clickArchive = (tela) => {

        enviarTelaSelecionada(tela);

        console.log("Archive", tela)

    }

    const clickTag = (tag) => {

        enviarTag(tag);
    }

    return (
        <>
            <nav className='notas-esquerda'>

                <img className="logo" src={flagDarkMode == true ? logoWhite : logo} alt="Logo Senai Notes" />

                <button className='botao-notes' onClick={() => clickHome("notas-ativas")}>
                    <FontAwesomeIcon icon={faHouse} className='icon' />
                    All Notes
                    <FontAwesomeIcon icon={faArrowRight} className='seta' />
                </button>

                <button className='botao-notes' onClick={() => clickArchive("notas-arquivadas")}>
                    <FontAwesomeIcon icon={faFileZipper} className='icon' />
                    Archived Notes
                    <FontAwesomeIcon icon={faArrowRight} className='seta' />
                </button>

                <div className="tags">
                    <p>Tags</p>

                    {tags.map(tag => (
                        <button className='botao-notes' onClick={() => clickTag(tag)}>
                            <FontAwesomeIcon icon={faTag} className='icon' />
                            {capitalizeFirstLetter(tag.nome)}
                        </button>

                    ))}
                </div>
            </nav>

        </>
    )
}

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default PainelEsquerdo;