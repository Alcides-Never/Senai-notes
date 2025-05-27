namespace API_Notes.DTO
{
    public class CadastrarNotaSemImagemDTO
    {
        public string? Titulo { get; set; }
        public string? Conteudo { get; set; }
        public DateTime? DataCriacao { get; set; }

        //public string? ImgUrl { get; set; }

        //Tags
        public string? Tags { get; set; }

        // Usuario
        public int IdUsuario { get; set; }


        //public List<string> Tags { get; set; }

    }
}
