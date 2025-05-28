import './painel-inferior-esquerda.css';

//import imgNote from '../../assets/img/Image-notes.svg'
import imgNote from '../../assets/img/Note.png'
import { useEffect, useState } from 'react';

function PainelInferiorEsquerda({ enviarNotaSelecionada, tagSelecionada, enviarTextoPesquisa }) {

    const [notes, setNotes] = useState([]);

    const link = 'https://apisenainoteshomologacao.azurewebsites.net/'
    //const link = 'http://localhost:3000/'


    useEffect(() => {

        getNotas();

    }, []);

    useEffect(() => {

        getNotas();

    }, [tagSelecionada, enviarTextoPesquisa]);


    const getNotas = async () => {

        let userId = localStorage.getItem("meuId");

        let response = await fetch(`${link}/api/Nota/listar/` + userId, {
        //let response = await fetch(`${link}buscaNota/` + userId, {
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

    const ClickCriarNote = async () => {
        let userId = localStorage.getItem("meuId");

        let tituloNota = prompt("Digite o nome da nota");

        let estuturaNote = {
            titulo: tituloNota,
            conteudo: "",
            dataCriacao: new Date().toISOString(),
            imgUrl: "",
            tags: "",
            idUsuario: userId,
            imagemAnotacao: ""
        };

        let response = await fetch(`${link}api/Nota/cadastrarNotaSemImagem`, {
        //let response = await fetch(`${link}buscarNota`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken"),
                "content-type": "application/json"
            },
            body: JSON.stringify(
                estuturaNote
            )
        });

        console.log(response);

        if (response.ok == true) {
            alert("Nova anotação criado com sucesso");
            await getNotas();
        } else if (response.status == 401) {
            alert("Token Inválido. Faça o login novamente");
            localStorage.clear();
            window.location.href = "/login";
        } else {
            alert("Nota não criada");
        }

    }

    const ClickCriarNoteForm = async () => {

        let userId = localStorage.getItem("meuId");
        let formData = new FormData();

        let estuturaNote = {
            titulo: "Nova Nota",
            conteudo: "Descricao nota",
            dataCriacao: new Date().toISOString(),
            imgUrl: "",
            tags: "",
            idUsuario: userId,
            imagemAnotacao: ""
        };

        formData.append("titulo", titulo);
        formData.append("conteudo", conteudo);
        formData.append("dataCriacao", new Date().toISOString(),);
        formData.append("imgUrl", "");
        formData.append("tags", "");
        formData.append("idUsuario", userId);
        formData.append("imagemAnotacao", "");

        const response = await fetch(`${link}api/Nota/cadastrarNota`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            },
            body: formData
        });

        console.log(response);

        if (response.ok == true) {
            alert("Nova anotação criado com sucesso");
            await getNotas();
        } else if (response.status == 401) {
            alert("Token Inválido. Faça o login novamente");
            localStorage.clear();
            window.location.href = "/login";
        } else {
            alert("Nota não criada");
        }

    }

    return (
        <>
            <nav className="inferior-esquerda">
                <button className='botao-new-note' onClick={() => ClickCriarNote()}> + Create New Note </button>

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


export default PainelInferiorEsquerda