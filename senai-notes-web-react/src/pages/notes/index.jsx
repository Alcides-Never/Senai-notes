import './notes.css';

import PainelEsquerdo from '../../components/painel-esquerdo';
import PainelSuperior from '../../components/painel-superior';
import PainelInferiorEsquerda from '../../components/painel-inferior-esquerda';
import PainelInferiorCentro from '../../components/painel-inferior-centro';
import PainelInferiorDireita from '../../components/painel-inferior-direita';
import PainelInferiorEsquerdaArchive from '../../components/painel-inferior-esquerda-archive';

import { useEffect, useState } from 'react';
import PainelSuperiorArchive from '../../components/painel-superior-archive';

function Notes() {


    const [noteSelecionada, setNoteSelecionada] = useState(null);
    const [tag, setTag] = useState(null);
    const [textoSelecionado, setTextoSelecionado] = useState(null);

    const [flagDarkMode, setFlagDarkMode] = useState(false);
    const [tela, setTela] = useState("notas-ativas");

    useEffect(() => {

        let modoEscuro = localStorage.getItem("dark-mode");
        if (modoEscuro === "true") {
            setFlagDarkMode(true);
            document.body.classList.add("dark-mode");
        } else {
            setFlagDarkMode(false);
            document.body.classList.remove("dark-mode");
        }

    }, []);

    return (
        <>
            <div className="tela">

                <PainelEsquerdo enviarTag={tag => setTag(tag)}
                    enviarTelaSelecionada={tela => setTela(tela)} 
                    enviarNotaSelecionada={nota => setNoteSelecionada(nota)}/>

                <main className='notas-direita'>

                    {tela == null || tela == "notas-ativas" && (
                        <>
                            <PainelSuperior enviarTexto={texto => setTextoSelecionado(texto)} />
                        </>
                    )}

                    {tela == "notas-arquivadas" && (
                        <>
                            <PainelSuperiorArchive enviarTexto={texto => setTextoSelecionado(texto)} />
                        </>
                    )}

                    <div className="inferior">

                        {tela == null || tela == "notas-ativas" && (
                            <>
                                <PainelInferiorEsquerda enviarNotaSelecionada={note => setNoteSelecionada(note)}
                                    tagSelecionada={tag}
                                    enviarTextoPesquisa={textoSelecionado} />
                            </>
                        )}

                        {tela == "notas-arquivadas" && (
                            <>
                                <PainelInferiorEsquerdaArchive enviarNotaSelecionada={note => setNoteSelecionada(note)}
                                    tagSelecionada={tag}
                                    enviarTextoPesquisa={textoSelecionado} />
                            </>
                        )}

                        {noteSelecionada != null && (
                            <>
                                <PainelInferiorCentro recebeNotaSelecionada={noteSelecionada} />

                                <PainelInferiorDireita deletarNotaSelecionada={noteSelecionada}
                                    arquivarNotaSelecionada={noteSelecionada} />
                            </>

                        )}

                        {noteSelecionada == null && (
                            <>
                                <p>Não existe uma nota selecionada</p>
                            </>
                        )}
                    </div>

                </main>

                <footer></footer>

            </div>

        </>
    )
}

export default Notes