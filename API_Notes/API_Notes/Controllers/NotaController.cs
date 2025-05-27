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
        if (not.imagemAnotacao != null)
        {

            // EXTRA - verifica se o arquivo é uma imagem

            // 1 - Criar uma variável - Pasta de Destino / Onde as imagens serão salvas
            var pastaDestino = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

            // 2 - Salvar o Arquivo

            // EXTRA - Criar um nome personalizado para o Arquivo

            var nomeArquivo = not.imagemAnotacao.FileName;

            var caminhoCompleto = Path.Combine(pastaDestino, nomeArquivo);

            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
            {
                not.imagemAnotacao.CopyTo(stream);
            }

            // 3 - Guardar o local do arquivo no BD
            not.ImgUrl = nomeArquivo;
        }
        _notaRepository.CadastrarNota(not);

        return Created("ok", not);
    }

    [HttpPost("cadastrarNotaSemImagem")]

    public IActionResult CadastrarNotaSemImagem(CadastrarNotaSemImagemDTO not)
    {
        _notaRepository.CadastrarNotaSemImagem(not);
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