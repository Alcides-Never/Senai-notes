using API_Notes.DTO;
using API_Notes.Interfaces;
using API_Notes.Models;
using API_Notes.Repositories;
using API_Notes.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

namespace API_Notes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioControllers : ControllerBase
    {

        private IUsuarioRepositories _usuarioRepositories;

        private PasswordService _passwordService = new PasswordService();

        public UsuarioControllers(IUsuarioRepositories usuarioRepositories)
        {
            _usuarioRepositories = usuarioRepositories;
        }

        [HttpGet("ListarTodos")]
       
        public IActionResult ListarTodos()
        {
            return Ok(_usuarioRepositories.ListarTodos());
        }

        [HttpGet("/Buscar/{nome}")]
        [SwaggerOperation(
            Summary = "Buscar por nome",
            Description = "Esta endpoint busca nomes dos usuarios")]
        public IActionResult BuscarPorNome(string nome)
        {
            return Ok(_usuarioRepositories.BuscarPorNome(nome));
        }

        [HttpPost("cadastrar")]
        public IActionResult CadastrarUsuario(CadastrarUsuarioDTO usuario)
        {
            _usuarioRepositories.Cadastrar(usuario);

            return Created();
        }

        [HttpGet("listar/{id}")]
        public IActionResult ListarPorId(int id)
        {

            Usuario usuario = _usuarioRepositories.BuscarPorID(id);

            if (usuario == null)
            {
                return NotFound();
            }
            return Ok(usuario);
        }

        [HttpPut("editar/{id}")]

        public IActionResult Editar(int id, Usuario usuario)
        {
            try
            {
                _usuarioRepositories.Atualizar(id, usuario);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                return NotFound(ex);
            }

        }
        [HttpDelete("deletar/{id}")]

        public IActionResult Delete(int id)
        {
            try
            {
                _usuarioRepositories.Deletar(id);

                return NoContent();
            }

            catch (ArgumentNullException ex)
            {
                return NotFound("Uusraio nao encontrado");
            }
        }

        [HttpPost("login")]

        public IActionResult Login(LoginDTO login)
        {
            var usuario = _usuarioRepositories.BuscarPorEmailSenha(login.Email, login.Senha);
            {
                if (usuario == null)
                {
                    return Unauthorized("Email ou senha invalido");
                }

                var tokenService = new TokenService();

                var token = tokenService.GenerateToken(usuario.Senha);

                return Ok(new
                {
                    token,
                    usuario
                });
              






            }
        }
       

    } 
}
