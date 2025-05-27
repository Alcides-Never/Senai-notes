
import './painel-inferior-direita.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faTrashCan } from '@fortawesome/free-solid-svg-icons';


function PainelInferiorDireita({ deletarNotaSelecionada, arquivarNotaSelecionada }) {

    const link = 'https://apisenainoteshomologacao.azurewebsites.net/'

    const clickDelete = async () => {

        const response = await fetch(`${link}api/Nota/excluirNota/${deletarNotaSelecionada.idNotas}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok == true) {
            alert("Anotação deletada com sucesso");
            window.location.reload()

        } else {
            alert("Erro ao deletar a nota");
        }
    }

        const clickArchive = async () => {

        const response = await fetch(`${link}api/Nota/arquivarNota/${arquivarNotaSelecionada.idNotas}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok == true) {
            alert("Anotação arquivada com sucesso");
            window.location.reload()

        } else {
            alert("Erro ao arquivar a nota");
        }
    }

    return (
        <>
            <nav className="inferior-direita">

                <button className='botao-notes'>
                    <FontAwesomeIcon icon={faArchive} className='icon' onClick={() => clickArchive()} />
                    Archive Notes
                </button>

                <button className='botao-notes' onClick={() => clickDelete()}>
                    <FontAwesomeIcon icon={faTrashCan} className='icon' />
                    Delete Notes
                </button>

            </nav >

        </>
    )
}

export default PainelInferiorDireita