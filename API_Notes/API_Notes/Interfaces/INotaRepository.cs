using API_Notes.DTO;
using API_Notes.Models;
using API_Notes.ViewModel;

namespace API_Notes.Interfaces
{
    public interface INotaRepository
    {
        List<ListarNotasViewModel> ListarTodos(int idUsuario);
        public BuscarNotaViewModel BuscarNota(int idNota);
        void CadastrarNota(CadastrarNotaDTO nota);

        void CadastrarNotaSemImagem(CadastrarNotaSemImagemDTO nota);
     
        void AtualizarNota(int idNota, AtualizarNotaDTO nota);

        void DeletarNota(int idNota);
        
        void ArquivarNota(int idNota);

        List<PesquisaViewModel> CampoPesquisa(string palavraPesquisa);

        List<PesquisaViewModel> CampoPesquisaArquivada(string palavraPesquisa);
        
        List<ListarNotasViewModel> ListarTodosArquivado(int idUsuario);

    }
}
