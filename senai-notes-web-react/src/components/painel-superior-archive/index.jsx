import './painel-superior-archive.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function PainelSuperiorArchive({ enviarTexto }) {

    const [texto, setTexto] = useState("");

    const clickSettings = async () => {

        window.location.href = "/settings"
    }

    const clickPesquisaArquivada = (texto) => {

        enviarTexto(texto);
    }

    const onKeyUp = (event) => {

        if (event.key == "Enter") {

            enviarTexto(texto);
        }
    }

    return (
        <>
            <nav className="superior">
                <h1>Archive</h1>

                <div className="pesquisa">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' onClick={() => clickPesquisaArquivada(texto)} />
                    <input onKeyUp={event => onKeyUp(event)} className="input" type="text" placeholder="Search by title, content or tags..." value={texto} onChange={event => setTexto(event.target.value)} />

                    <FontAwesomeIcon icon={faGear} className='icon' onClick={() => clickSettings()} />

                </div>

            </nav>

        </>
    )
}

export default PainelSuperiorArchive;
