import './painel-inferior-esquerda-archive.css';

import imgNote from '../../assets/img/Image-notes.svg'
import { useEffect, useState } from 'react';

function PainelInferiorEsquerdaArchive({ enviarNotaSelecionada, tagSelecionada, enviarTextoPesquisa }) {

    const [notes, setNotes] = useState([]);

    const link = 'https://apisenainoteshomologacao.azurewebsites.net/'


    useEffect(() => {

        getNotasArquivadas();

    }, []);

    useEffect(() => {

        getNotasArquivadas();

    }, [tagSelecionada, enviarTextoPesquisa]);


    const getNotasArquivadas = async () => {

        let userId = localStorage.getItem("meuId");

        let response = await fetch(`${link}/api/Nota/ListarTodosArquivado/` + userId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken"),
                "content-type": "application/json"
            }
        });

        if (response.ok == true) {

            let json = await response.json();

            if (tagSelecionada) {

                json = json.filter(note => note.tags.map(tag => capitalizeFirstLetter(tag.nome)).includes(capitalizeFirstLetter(tagSelecionada.nome)));

            }

            if (enviarTextoPesquisa) {
                json = json.filter(note => note.titulo.includes(enviarTextoPesquisa));
            }

            setNotes(json);
        }
    }

    const clickNote = (note) => {

        enviarNotaSelecionada(note);

    }

    return (
        <>
            <nav className="inferior-esquerda">

                {notes.map(note => (

                    <div className='nota-incluida' onClick={() => clickNote(note)}>
                        <img src={imgNote} alt="Imagem da Nota" />
                        <div className="inf-tag">
                            <p>{note.titulo} </p>
                            <div className="tags-notas">
                                {note.tags.map(tag => (
                                    <p className='tag1'>{capitalizeFirstLetter(tag.nome)}</p>
                                    /*<p className='tag1'>{tags.map(tag => ({capitalizeFirstLetter(tag.nome)}))} </> */
                                ))}

                            </div>
                            <p>{new Date(note.dataCriacao).toLocaleDateString()}</p>

                        </div>

                    </div>

                ))}

            </nav>

        </>
    )
}

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}


export default PainelInferiorEsquerdaArchive