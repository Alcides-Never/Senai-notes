import './painel-inferior-centro.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';

import imagemDescricao from "../../assets/img/imagem-Descricao.svg"


function PainelInferiorCentro({ recebeNotaSelecionada }) {

    const [titulo, setTitulo] = useState("");
    const [tags, setTags] = useState([]);
    const [conteudo, setConteudo] = useState("");
    const [imagem, setImagemm] = useState(null);
    const [imagemURL, setImagemURL] = useState(null);

    const link = 'https://apisenainoteshomologacao.azurewebsites.net/'


    useEffect(() => {
        if (recebeNotaSelecionada) {
            setTitulo(recebeNotaSelecionada.titulo);
            setTags(recebeNotaSelecionada.tags.map(tag => tag.nome).join(", "));

            getConteudoNota();
        }
    }, [recebeNotaSelecionada]);


    const getConteudoNota = async () => {

        let response = await fetch(`${link}api/Nota/buscarNota/${recebeNotaSelecionada.idNotas}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        });

        if (response.ok == true) {

            let json = await response.json();

            setConteudo(json.conteudo);
        } else {
            alert("Erro ao buscar conteudo da nota")
        }
    }

    const clickSalvar = async () => {

        let userId = localStorage.getItem("meuId");

        const response = await fetch(`${link}api/Nota/editarNota/${recebeNotaSelecionada.idNotas}`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo,
                conteudo,
                dataEdicao: new Date().toISOString(),
                imgUrl: " ",
                tags: tags,
                idUsuario: userId
            })
        });

        if (response.ok == true) {
            alert("Anotação atualizada com sucesso");
            window.location.reload()

        } else {
            alert("Erro ao atualizar nota");
        }
    }

    const clickSalvarImg = async () => {  /*Exemplo de estutura para enviar imagem */

        let userId = localStorage.getItem("meuId");

        let formData = new formData();

        formData.append("titulo", titulo);
        formData.append("conteudo", conteudo);
        formData.append("dataEdicao", new Date().toISOString(),);
        formData.append("imgUrl", imagem);
        formData.append("tags", tags);
        formData.append("idUsuario", userId);

        const response = await fetch(`${link}api/Nota/editarNota/${recebeNotaSelecionada.idNotas}`, {
            method: "PUT",
            body: formData
        });

        if (response.ok == true) {
            alert("Anotação atualizada com sucesso");
            window.location.reload()

        } else {
            alert("Erro ao atualizar nota");
        }
    }

    const adicionarImagem = (event) => {

        const arquivo = event.target.files[0];

        console.log("arquivo", arquivo);

        setImagemm(arquivo);
        setImagemURL(URL.createObjectURL(arquivo));

    }

    const clickCancel = () => {

        window.location.href = "/notes"
    }

    return (
        <>
            <nav className="inferior-centro">

                <label className="imagem" style={{ backgroundImage: `url('${imagemURL || imagemDescricao}')` }}>

                    <input onChange={event => adicionarImagem(event)} type='file' className='file-input' />

                </label>

                <input type="text" className='titulo' placeholder='Insira o titulo da nota' value={titulo} onChange={event => setTitulo(event.target.value)} />

                <div className="inf-descricao">
                    <p className='tag-descricao'>
                        <FontAwesomeIcon icon={faTags} className='icon' />
                        Tags
                    </p>
                    <input type="text" className='tag-descricao' value={capitalizeFirstLetter(tags)} onChange={event => setTags(event.target.value)} />
                </div>

                <div className="inf-descricao">
                    <p className='tag-descricao'>
                        <FontAwesomeIcon icon={faClock} className='icon' />
                        Data Criação
                    </p>
                    <p className='tag-descricao'>{new Date(recebeNotaSelecionada?.dataCriacao).toLocaleDateString()}</p>
                </div>

                <div className="inf-descricao">
                    <p className='tag-descricao'>
                        <FontAwesomeIcon icon={faClock} className='icon' />
                        Data Edição
                    </p>
                    <p className='tag-descricao'>{new Date(recebeNotaSelecionada?.dataEdicao).toLocaleDateString()}</p>
                </div>

                <div className="detalhe">
                    <textarea className="texto" name="texto" value={conteudo} onChange={event => setConteudo(event.target.value)} > </textarea>
                </div>


                <div className="area-botoes">
                    <button className='botao-save' onClick={() => clickSalvar()}> Salve Notes </button>

                    <button className='botao-cancel' onClick={() => clickCancel()}> Cancel </button>

                </div>

            </nav>



        </>
    )
}

function capitalizeFirstLetter(text) {
    //return text.charAt(0).toUpperCase() + text.slice(1);
}

export default PainelInferiorCentro