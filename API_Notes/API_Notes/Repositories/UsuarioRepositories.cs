using API_Notes.Context;
using API_Notes.DTO;
using API_Notes.Interfaces;
using API_Notes.Models;
using API_Notes.Service;
using API_Notes.ViewModels;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace API_Notes.Repositories
{
    public class UsuarioRepositories : IUsuarioRepositories
    {

        private readonly SenaiNotesContext _context;

        public UsuarioRepositories(SenaiNotesContext context)
        {
            _context = context;
        }


        void IUsuarioRepositories.Atualizar(int id, Usuario usuarioNovo)
        {
            Usuario usuarioEncontrado = _context.Usuarios.FirstOrDefault(a => a.IdUsuario == id);

            if (usuarioEncontrado == null)
            {
                throw new ArgumentNullException("Usuario não encontrado");

            }
            usuarioEncontrado.IdUsuario = usuarioNovo.IdUsuario;
            usuarioEncontrado.Email = usuarioNovo.Email;
            usuarioEncontrado.Senha = usuarioNovo.Senha;
            usuarioEncontrado.DataCriacao = usuarioNovo.DataCriacao;
            usuarioEncontrado.Nome = usuarioNovo.Nome;

            _context.SaveChanges();
        }

         public Usuario BuscarPorEmailSenha(string email, string senha)
        {
            var usuarioEncontrado = _context.Usuarios.FirstOrDefault(p => p.Email == email);

            if (usuarioEncontrado == null)
            {
                return null;
            }

            var passwordService = new PasswordService();

            var resultado = passwordService.VerificarSenha(usuarioEncontrado, senha);

            if (resultado == true) return usuarioEncontrado;

            return null;

        }

        Usuario IUsuarioRepositories.BuscarPorID(int id)
        {
            return _context.Usuarios.FirstOrDefault(u => u.IdUsuario == id);
        }


        void IUsuarioRepositories.Cadastrar(CadastrarUsuarioDTO usuario)
        {
            var passwordService = new PasswordService();

            Usuario cadastroUsuario = new Usuario
            {
                IdUsuario = usuario.IdUsuario,
                Email = usuario.Email,
                Senha = usuario.Senha,
                DataCriacao = usuario.DataCriacao,
                Nome = usuario.Nome,
            };

            cadastroUsuario.Senha = passwordService.HashPassword(cadastroUsuario);

            _context.Usuarios.Add(cadastroUsuario);
            _context.SaveChanges();
        }

        void IUsuarioRepositories.Deletar(int id)
        {
            Usuario usuarioEcontrado = _context.Usuarios.FirstOrDefault();

            if (usuarioEcontrado == null)
            {
                throw new ArgumentNullException("Usuario não encontrado");
            }

            _context.Usuarios.Remove(usuarioEcontrado);
            _context.SaveChanges();
        }

        

        List <Usuario> IUsuarioRepositories.ListarTodos()
        {
            return _context.Usuarios.ToList();
        }

        public Usuario BuscarPorNome(string nome)
        {
            var listaUsuario = _context.Usuarios.FirstOrDefault( c => c.Nome == nome);

            return listaUsuario;
        }


    }
}


    
        