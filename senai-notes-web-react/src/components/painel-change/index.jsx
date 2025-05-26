import './painel-change.css';

import { useState } from 'react';

function PainelChangePassword() {

    const [oldPass, setOldPass] = useState(null);
    const [newPass, setNewPass] = useState(null);
    const [confirmPass, setConfirmPass] = useState(null);

    return (
        <>
            <nav className="box-senha">
                <h1 className='titulo-change'>Change Password</h1>
                <p className='descricao'>Old Password </p>
                <input className="input-senha" type="password" value={oldPass} onChange={event => setOldPass(event.target.value)} />
                <p className='descricao'>New Password </p>
                <input className="input-senha" type="password" value={newPass} onChange={event => setNewPass(event.target.value)} />
                <p className='descricao-p'>At least 8 characters</p>
                <p className='descricao'>Confirm New Password </p>
                <input className="input-senha" type="password" value={confirmPass} onChange={event => setConfirmPass(event.target.value)} />

                <button className='botao-change'> Save Password</button>

            </nav>

        </>
    )
}

export default PainelChangePassword