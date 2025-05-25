using API_Notes.DTO;
using API_Notes.Models;

namespace API_Notes.Interfaces
{
    public interface IUsuarioRepositories
    {
        List<Usuario> ListarTodos();

        Usuario BuscarPorID(int id);

        Usuario BuscarPorEmailSenha(string email, string senha);

        Usuario BuscarPorNome(string nome);

        void Cadastrar(CadastrarUsuarioDTO usuario);    

        void Atualizar(int id, Usuario usuario);    

        void Deletar(int id);

        








        
    }
}
