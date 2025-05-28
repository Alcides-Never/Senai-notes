import './login.css'
import logo from '../../assets/img/logo.svg'
import logoWhite from '../../assets/img/logo-white.svg';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [flagDarkMode, setFlagDarkMode] = useState(false);

    const link = 'https://apisenainoteshomologacao.azurewebsites.net/'  
    //const link = 'http://localhost:3000/'

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

    const clickLogin = async () => {

        let emailValid = validarEmail(email);
        console.log(emailValid);

        if (email == "" || senha == "") {
            alert("Email não informado");
        } else if (emailValid == false) {
            alert("Email inválido. Tente novamente");
        } else {
            let response = await fetch(`${link}api/UsuarioControllers/login`, { 
            //let response = await fetch(`${link}users`, {
                headers: {
                    "content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            });

            console.log(response);

            if (response.ok == true) {

                let json = await response.json();

                let userId = json.usuario.idUsuario;
                let token = json.token;
                let nome = json.usuario.nome;  

                // let userId = json.idUsuario;
                // let token = json.token;
                // let nome = json.nome;


                // GUARDAR INFORMAÇÃO NA PAGINA
                localStorage.setItem("meuId", userId);
                localStorage.setItem("meuToken", token);
                localStorage.setItem("nome", nome);

                // alert("Login realizado com sucesso. Seja Bem Vindo(a) " + nome); 
                toast.success("Login realizado com sucesso. Seja Bem Vindo(a) " + nome);

                window.location.href = "/notes"

            } else {

                if (response.status == 401) {

                    alert("Credenciais incorretas. Tente novamente");

                } else {

                    alert("Erro inesperado aconteceu, caso persista contate os administradores.");
                }
            }
        }
    }

    const onKeyUp = (event) => {

        if (event.key == "Enter") {

            clickLogin(senha);

        }
    }

    return (
        <>

            <header></header>

            <div className="borda-login">

                <main className="page-container">

                    <img src={flagDarkMode == true ? logoWhite : logo} alt="Logo Senai Notes" />

                    <h1>Welcome to Notes</h1>
                    <p>Please log in to continue</p>

                    <div className="login-container">

                        <div className="label">
                            <p className="descricao-email">Email Address</p>
                            <p></p>
                        </div>


                        <input className="inpt" value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="email@example.com" />

                        <div className="label">
                            <p className="descricao-senha">Password</p>
                            <a href='/forgot'> Forgot</a>
                        </div>

                        <input onKeyUp={event => onKeyUp(event)} className="inpt" value={senha} onChange={event => setSenha(event.target.value)} type="password" placeholder="Insira a senha" />

                        <button className="btn" onClick={() => clickLogin()}>Entrar</button>

                        <div className="valida-usuario">
                            <p> No account yet ? </p>
                            <a className="link" href='/usuario'> Sign Up</a>
                        </div>

                    </div>

                </main>

            </div>

            <footer></footer>



        </>
    )
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);

}

export default Login
