using API_Notes;
using API_Notes.Context;
using API_Notes.Interfaces;
using API_Notes.Repositories;
using Azure.Identity;
using System.Diagnostics.Tracing;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

    });
    
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(options =>
{
    options.EnableAnnotations();
});

//Esta linha é necessário para que o Ctor, relacionado a injeção das dependências em outras classes, opere normalmente. O mesmo principio que o @autowired no Java 
builder.Services.AddDbContext<SenaiNotesContext, SenaiNotesContext>();

builder.Services.AddTransient<INotaRepository, NotaRepository>();

builder.Services.AddTransient<ITagRepository, TagRepository>();

builder.Services.AddTransient<IUsuarioRepositories, UsuarioRepositories>();


builder.Services.AddAuthentication("Bearer").AddJwtBearer("Bearer", static options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ValidIssuer = "API_Notes",
        ValidAudience = "API_Notes",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGJi4pqLu42RnEAKRJYaxmNGrY+v\r\nfAqfW8W0xMHs2sD6TnJ5KWlePDz8OEqQ968ck55uNFb+paQvHyb8y2PonoN2g3Pk\r\nWJCnWIbVaF0u3VcLwTKUU4dg2/33LXrE50iLvsJRdgRa4BWOhqBIpJsyLcF1o63V\r\n+iNyaOrWZHb+B3KDAgMBAAE="))
    };
});

builder.Services.AddAuthorization();

builder.Services.AddCors(
    options =>
    {
        options.AddPolicy(
            name: "minhasOrigens",
            policy =>
            {
                policy.WithOrigins("http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5500");
                policy.AllowAnyHeader();
                policy.AllowAnyMethod();
            }
        );
    });

var app = builder.Build();

app.UseCors("minhasOrigens");

// Antes de Iniciar o Projeto, caso queira testar na sua máquina, descomente a linha abaixo e rode a aplicacao
//app.MapGet("/", () => "Hello World!");

testeComunicacao.TesteComunicacao();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});

app.MapControllers();

app.UseAuthentication();
app.UseAuthorization();

app.Run();