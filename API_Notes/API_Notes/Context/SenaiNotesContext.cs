using System;
using System.Collections.Generic;
using API_Notes.Models;
using Microsoft.EntityFrameworkCore;

namespace API_Notes.Context;

public partial class SenaiNotesContext : DbContext
{
    public SenaiNotesContext()
    {
    }

    private IConfiguration _configuration;

    public SenaiNotesContext(DbContextOptions<SenaiNotesContext> options, IConfiguration config)
        : base(options)
    {
        _configuration = config;
    }

    public virtual DbSet<ConfiguracaoUsuario> ConfiguracaoUsuarios { get; set; }

    public virtual DbSet<Nota> Notas { get; set; }

    public virtual DbSet<NotasTag> NotasTags { get; set; }

    public virtual DbSet<Tag> Tags { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var con = _configuration.GetConnectionString("DefaultConnection");
        optionsBuilder.UseSqlServer(con);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ConfiguracaoUsuario>(entity =>
        {
            entity.HasKey(e => e.IdConfig).HasName("PK__Configur__65F43AFDE4DD4C21");

            entity.ToTable("Configuracao_Usuario", tb => tb.HasTrigger("trg_audit_configuracao_usuario"));

            entity.Property(e => e.IdConfig).HasColumnName("Id_Config");
            entity.Property(e => e.Fonte)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.ConfiguracaoUsuarios)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Configura__Id_Us__60A75C0F");
        });

        modelBuilder.Entity<Nota>(entity =>
        {
            entity.HasKey(e => e.IdNotas).HasName("PK__Notas__C799B3C3974AA900");

            entity.ToTable(tb => tb.HasTrigger("trg_audit_notas"));

            entity.Property(e => e.IdNotas).HasColumnName("Id_Notas");
            entity.Property(e => e.DataCriacao)
                .HasColumnType("datetime")
                .HasColumnName("Data_Criacao");
            entity.Property(e => e.DataEdicao)
                .HasColumnType("datetime")
                .HasColumnName("Data_Edicao");
            entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");
            entity.Property(e => e.ImgUrl)
                .IsUnicode(false)
                .HasColumnName("Img_Url");
            entity.Property(e => e.Titulo)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Nota)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Notas__Id_Usuari__6383C8BA");
        });

        modelBuilder.Entity<NotasTag>(entity =>
        {
            entity.HasKey(e => e.IdNotasTag).HasName("PK__Notas_Ta__85E115E50ABD5B10");

            entity.ToTable("Notas_Tag", tb => tb.HasTrigger("trg_audit_notas_tag"));

            entity.Property(e => e.IdNotasTag).HasColumnName("Id_Notas_Tag");
            entity.Property(e => e.IdNotas).HasColumnName("Id_Notas");
            entity.Property(e => e.IdTag).HasColumnName("Id_Tag");

            entity.HasOne(d => d.IdNotasNavigation).WithMany(p => p.NotasTags)
                .HasForeignKey(d => d.IdNotas)
                .HasConstraintName("FK__Notas_Tag__Id_No__6B24EA82");

            entity.HasOne(d => d.IdTagNavigation).WithMany(p => p.NotasTags)
                .HasForeignKey(d => d.IdTag)
                .HasConstraintName("FK__Notas_Tag__Id_Ta__6C190EBB");
        });

        modelBuilder.Entity<Tag>(entity =>
        {
            entity.HasKey(e => e.IdTag).HasName("PK__Tag__5513B4C13BA36525");

            entity.ToTable("Tag", tb => tb.HasTrigger("trg_audit_tag"));

            entity.Property(e => e.IdTag).HasColumnName("Id_Tag");
            entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");
            entity.Property(e => e.Nome)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Tags)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Tag__Id_Usuario__68487DD7");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__63C76BE2B1BB636A");

            entity.ToTable("Usuario", tb => tb.HasTrigger("trg_audit_usuario"));

            entity.HasIndex(e => e.Email, "UQ__Usuario__A9D10534B3ACA2FD").IsUnique();

            entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");
            entity.Property(e => e.DataCriacao)
                .HasColumnType("datetime")
                .HasColumnName("Data_Criacao");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nome)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Senha).IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
