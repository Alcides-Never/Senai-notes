using API_Notes.DTO;
using API_Notes.Interfaces;
using API_Notes.Models;
using API_Notes.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API_Notes.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NotaController : Controller
{
    private INotaRepository _notaRepository;

    public NotaController(INotaRepository notaRepository)
    {
        _notaRepository = notaRepository;
    }

    [HttpGet("listar/{idUsuario}")]
    public IActionResult ListarNotas(int idUsuario)
    {
        return Ok(_notaRepository.ListarTodos(idUsuario));
    }

    [HttpPost("cadastrarNota")]
    public IActionResult CadastrarNota(CadastrarNotaDTO not)
    {
        _notaRepository.CadastrarNota(not);

        return Created("ok", not);
    }

    [HttpGet("buscarNota/{idNota}")]
    public IActionResult BuscarNota(int idNota)
    {
        return Ok(_notaRepository.BuscarNota(idNota));
    }

    [HttpPut("editarNota/{idNota}")]
    public IActionResult AtualizarNota(int idNota, AtualizarNotaDTO nota)
    {
        _notaRepository.AtualizarNota(idNota, nota);
        return Ok(nota);
    }

    [HttpDelete("excluirNota/{idNota}")]
    public IActionResult DeletarNota(int idNota)
    {
            _notaRepository.DeletarNota(idNota);
            return NoContent();
    }

    [HttpPut("arquivarNota/{idNota}")]
    public IActionResult ArquivarNota(int IdNota)
    {
        _notaRepository.ArquivarNota(IdNota);
        return Ok();
    }

    [HttpGet("CampoPesquisa/{palavraPesquisada}")]
    public IActionResult PesquisarNota(string palavraPesquisada)
    {
        return Ok(_notaRepository.CampoPesquisa(palavraPesquisada));
    }

    [HttpGet("CampoPesquisaArquivada/{palavraPesquisada}")]
    public IActionResult CampoPesquisaArquivada(string palavraPesquisada)
    {
        return Ok(_notaRepository.CampoPesquisaArquivada(palavraPesquisada));
    }

    [HttpGet("ListarTodosArquivado/{idUsuario}")]
    public IActionResult ListarTodosArquivado(int idUsuario)
    {
        return Ok(_notaRepository.ListarTodosArquivado(idUsuario));
    }
}   