namespace API_Notes.DTO;

public class AtualizarNotaDTO
{
    public string? Titulo { get; set; }
    
    public string? Conteudo { get; set; }
    
    public DateTime? DataEdicao { get; set; }
    
    //public string? ImgUrl { get; set; }
    
    //string
    public string? Tags { get; set; }

    //public List<string> Tags { get; set; }

    // usuario
    public int IdUsuario { get; set; }
}