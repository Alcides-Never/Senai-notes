namespace API_Notes.DTO
{
    public class CadastrarUsuarioDTO
    {
        public int IdUsuario { get; set; }

        public string Email { get; set; } = null!;

        public string Senha { get; set; } = null!;

        public string Nome { get; set; } = null!;

        public DateTime? DataCriacao { get; set; }

        public List<string> Tags { get; set; }
    }

}
