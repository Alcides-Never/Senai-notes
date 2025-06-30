import './settings.css';

import PainelEsquerdo from '../../components/painel-esquerdo';
import PainelSuperiorSettings from '../../components/painel-superior-settings';
import PainelEsquerdoSettings from '../../components/painel-esquerdo-settings';
import PainelTema from '../../components/painel-tema';
import PainelChangePassword from '../../components/painel-change';

import { useState } from 'react';

function Settings() {

    const [tela, setTela] = useState(null);
    const [tag, setTag] = useState(null);
    const [noteSelecionada, setNoteSelecionada] = useState(null);

    return (
        <>
            <div className="tela-settings">

                <PainelEsquerdo
                    enviarTag={tag => setTag(tag)}
                    enviarTelaSelecionada={tela => setTela(tela)}
                    enviarNotaSelecionada={nota => setNoteSelecionada(nota)} /> 

                <main className='painel-direito'>

                    <PainelSuperiorSettings />

                    <div className="painel-inferior">

                        <PainelEsquerdoSettings enviarTelaSelecionadaSettings={tela => setTela(tela)} />

                        {tela == "color-theme" && (
                            <>
                                <PainelTema />
                            </>
                        )}

                        {tela == "change-password" && (
                            <>
                                <PainelChangePassword />
                            </>
                        )}


                    </div>

                </main>

                <footer></footer>

            </div>

        </>
    )
}

export default Settings