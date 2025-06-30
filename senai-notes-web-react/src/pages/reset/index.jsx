import './reset.css'
import logo from '../../assets/img/logo.svg'

function Reset() {


    return (
        <>

            <header></header>

            <div className="borda-reset">

                <main className="page-container-reset">

                    <img src={logo} alt="Logo Senai Notes" />

                    <h1>Reset Your Password</h1>
                    <p className='descricao'>Chose a new password to secure your account.</p>

                    <div className="reset-container">

                        <div className="label">
                            <p className="descricao-email">New Password</p>
                            <p></p>
                        </div>


                        <input className="inpt" type="password" />
                        <p className='descricao'>At least 8 characters</p>

                        <div className="label">
                             <p className="descricao-senha">Confirm New Password</p>
                            <p></p>
                        </div>

                        <input className="inpt" type="password" />

                        <button className="btn" >Reset Password</button>

                    </div>

                </main>

            </div>

            <footer></footer>



        </>
    )
}

export default Reset
