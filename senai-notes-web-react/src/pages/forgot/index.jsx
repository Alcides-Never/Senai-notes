import './forgot.css'
import logo from '../../assets/img/logo.svg'

function Forgot() {


    return (
        <>

            <header></header>

            <div className="borda-forgot">

                <main className="page-container-forgot">

                    <img src={logo} alt="Logo Senai Notes" />

                    <h1>Forgotten your password?</h1>
                    <p className='descricao'>Enter your email below, and we'll send you a link  to reset it.</p>

                    <div className="forgot-container">

                        <div className="label">
                            <p className="descricao-email">Email Address</p>
                            <p></p>
                        </div>

                        <input className="inpt" type="email" placeholder="email@example.com" />


                        <button className="btn" >Send Reset Link</button>

                    </div>

                </main>

            </div>
            <footer></footer>



        </>
    )
}

export default Forgot
