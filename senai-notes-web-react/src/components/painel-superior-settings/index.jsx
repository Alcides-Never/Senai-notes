import './painel-superior-settings.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function PainelSuperiorSettings() {

    return (
        <>
            <nav className="superior">
                <h1>Settings</h1>

                <div className="pesquisa">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' />
                    <input className="input" type="text" placeholder="Search by title, content or tags..." />

                    <FontAwesomeIcon icon={faGear} className='icon' />

                </div>

            </nav>

        </>
    )
}

export default PainelSuperiorSettings;
