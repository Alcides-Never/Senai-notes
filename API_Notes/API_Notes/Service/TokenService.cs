using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace API_Notes.Service
{
    public class TokenService
    {
        public string GenerateToken(string email)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, email),
            };

            var chave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGJi4pqLu42RnEAKRJYaxmNGrY+v\r\nfAqfW8W0xMHs2sD6TnJ5KWlePDz8OEqQ968ck55uNFb+paQvHyb8y2PonoN2g3Pk\r\nWJCnWIbVaF0u3VcLwTKUU4dg2/33LXrE50iLvsJRdgRa4BWOhqBIpJsyLcF1o63V\r\n+iNyaOrWZHb+B3KDAgMBAAE="));

            var creds = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "API_Notes",
                audience: "API_Notes",
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creds


                );
                return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
