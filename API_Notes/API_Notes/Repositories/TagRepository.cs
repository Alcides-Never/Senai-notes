using API_Notes.Context;
using API_Notes.DTO;
using API_Notes.Interfaces;
using API_Notes.Models;
using API_Notes.ViemModel;
using API_Notes.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_Notes.Repositories
{
    public class TagRepository : ITagRepository
    {
        private readonly SenaiNotesContext _context;

        public TagRepository(SenaiNotesContext context)
        {
            _context = context;
        }
        

        // Listagem de Tag
        public List<ListarTagsViewModel> ListarTodos(int userId)
       
        {
            var listaTags = _context.NotasTags
                .Where(t => t.IdNotasNavigation.IdUsuario == userId && t.IdNotasNavigation.Arquivada == false)
                .Select(c =>
                    new ListarTagsViewModel
                    {
                        IdTag = c.IdTagNavigation.IdTag,
                        Nome = c.IdTagNavigation.Nome,
                    })
                .ToList();

            return listaTags;
        }

        // Retorno da Tag Selecionada
        public List<RetornoTagViewModel> BuscarTag(int tagId, int userId)
        {
            var tagRetorno = _context.NotasTags
                .Where(n => n.IdTag == tagId && n.IdNotasNavigation.Arquivada == false && n.IdNotasNavigation.IdUsuario == userId)
                .Select(n => new RetornoTagViewModel
                {
                    IdNotas = n.IdNotasNavigation.IdNotas,
                    Titulo = n.IdNotasNavigation.Titulo,
                    DataCriacao = n.IdNotasNavigation.DataCriacao,
                    DataEdicao = n.IdNotasNavigation.DataEdicao
                })
                .ToList();
            return tagRetorno;
        } 
    }
}