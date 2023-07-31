﻿// <auto-generated />
using System;
using Lotus.Account;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Lotus.Account.Migrations
{
    [DbContext(typeof(CAccountDbContext))]
    [Migration("20230708120629_AddNotification")]
    partial class AddNotification
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("adm")
                .HasAnnotation("ProductVersion", "6.0.19")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Lotus.Account.CAvatar", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<byte[]>("FullImage")
                        .HasColumnType("bytea");

                    b.Property<byte[]>("SmallImage")
                        .HasColumnType("bytea");

                    b.HasKey("Id");

                    b.ToTable("Avatar", "adm");
                });

            modelBuilder.Entity("Lotus.Account.CDevice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Brand")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("CodeId")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("character varying(60)");

                    b.Property<string>("Family")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.Property<bool>("IsMobileDevice")
                        .HasColumnType("boolean");

                    b.Property<string>("Model")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Platform")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Device", "adm");
                });

            modelBuilder.Entity("Lotus.Account.CFieldActivity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.Property<string>("ShortName")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Id");

                    b.ToTable("FieldActivity", "adm");
                });

            modelBuilder.Entity("Lotus.Account.CGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.Property<string>("ShortName")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Id");

                    b.ToTable("Group", "adm");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Хранители",
                            ShortName = "Хранители"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Север",
                            ShortName = "Север"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Юг",
                            ShortName = "Юг"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Восток",
                            ShortName = "Восток"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Запад",
                            ShortName = "Запад"
                        });
                });

            modelBuilder.Entity("Lotus.Account.CMessage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("AuthorId")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsRead")
                        .HasColumnType("boolean");

                    b.Property<Guid?>("ReceiverId")
                        .HasColumnType("uuid");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Time")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("ReceiverId");

                    b.ToTable("Message", "adm");
                });

            modelBuilder.Entity("Lotus.Account.CNotification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("Importance")
                        .HasColumnType("integer");

                    b.Property<bool>("IsArchive")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsRead")
                        .HasColumnType("boolean");

                    b.Property<string>("Sender")
                        .HasColumnType("text");

                    b.Property<string>("Topic")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Notification", "adm");
                });

            modelBuilder.Entity("Lotus.Account.CPermission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("DispalyName")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.Property<string>("SystemName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Id");

                    b.ToTable("Permission", "adm");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DispalyName = "Администрирование системы",
                            SystemName = "admin"
                        },
                        new
                        {
                            Id = 2,
                            DispalyName = "Модератор",
                            SystemName = "editor"
                        },
                        new
                        {
                            Id = 3,
                            DispalyName = "Пользователь",
                            SystemName = "user"
                        });
                });

            modelBuilder.Entity("Lotus.Account.CPosition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.Property<string>("ShortName")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Id");

                    b.ToTable("Position", "adm");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Инспектор",
                            ShortName = "Инспектор"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Старший инспектор",
                            ShortName = "Старший инспектор"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Ведущий специалист",
                            ShortName = "Ведущий специалист"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Начальник отдела",
                            ShortName = "Начальник отдела"
                        });
                });

            modelBuilder.Entity("Lotus.Account.CRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("DispalyName")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.Property<string>("SystemName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Id");

                    b.ToTable("Role", "adm");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DispalyName = "Администратор",
                            SystemName = "admin"
                        },
                        new
                        {
                            Id = 2,
                            DispalyName = "Редактор",
                            SystemName = "editor"
                        },
                        new
                        {
                            Id = 3,
                            DispalyName = "Пользователь",
                            SystemName = "user"
                        });
                });

            modelBuilder.Entity("Lotus.Account.CRolePermission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("PermissionId")
                        .HasColumnType("integer");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("PermissionId");

                    b.HasIndex("RoleId");

                    b.ToTable("RolePermission", "adm");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            PermissionId = 1,
                            RoleId = 1
                        },
                        new
                        {
                            Id = 2,
                            PermissionId = 2,
                            RoleId = 2
                        },
                        new
                        {
                            Id = 3,
                            PermissionId = 3,
                            RoleId = 3
                        });
                });

            modelBuilder.Entity("Lotus.Account.CSession", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("BeginTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Browser")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<int?>("DeviceId")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("EndTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("DeviceId");

                    b.HasIndex("UserId");

                    b.ToTable("Session", "adm");
                });

            modelBuilder.Entity("Lotus.Account.CUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int?>("AvatarId")
                        .HasColumnType("integer");

                    b.Property<DateOnly?>("Birthday")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("Name")
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("Patronymic")
                        .HasColumnType("text");

                    b.Property<int?>("PostId")
                        .HasColumnType("integer");

                    b.Property<int?>("RoleId")
                        .HasColumnType("integer");

                    b.Property<string>("RoleSystemName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Surname")
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.HasKey("Id");

                    b.HasIndex("AvatarId");

                    b.HasIndex("PostId");

                    b.HasIndex("RoleId");

                    b.ToTable("User", "adm");

                    b.HasData(
                        new
                        {
                            Id = new Guid("e3182c8f-87bc-4e27-a27f-b32e3e2b8018"),
                            Email = "dementevds@gmail.com",
                            EmailConfirmed = false,
                            Login = "DanielDem",
                            Name = "Даниил",
                            PasswordHash = "012f28fd2973783520fa3115f886102a09c8a15e",
                            Patronymic = "Сергеевич",
                            RoleId = 1,
                            RoleSystemName = "Нет роли",
                            Surname = "Дементьев"
                        });
                });

            modelBuilder.Entity("Lotus.Account.CUserFieldActivity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("FieldActivityId")
                        .HasColumnType("integer");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("FieldActivityId");

                    b.HasIndex("UserId");

                    b.ToTable("UserFieldActivity", "adm");
                });

            modelBuilder.Entity("Lotus.Account.CUserGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("GroupId")
                        .HasColumnType("integer");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("UserId");

                    b.ToTable("UserGroup", "adm");
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreApplication", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<string>("ClientId")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("ClientSecret")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyToken")
                        .IsConcurrencyToken()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("ConsentType")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("DisplayName")
                        .HasColumnType("text");

                    b.Property<string>("DisplayNames")
                        .HasColumnType("text");

                    b.Property<string>("Permissions")
                        .HasColumnType("text");

                    b.Property<string>("PostLogoutRedirectUris")
                        .HasColumnType("text");

                    b.Property<string>("Properties")
                        .HasColumnType("text");

                    b.Property<string>("RedirectUris")
                        .HasColumnType("text");

                    b.Property<string>("Requirements")
                        .HasColumnType("text");

                    b.Property<string>("Type")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Id");

                    b.HasIndex("ClientId")
                        .IsUnique();

                    b.ToTable("OpenIddictApplications", "adm");
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreAuthorization", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<string>("ApplicationId")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyToken")
                        .IsConcurrencyToken()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<DateTime?>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Properties")
                        .HasColumnType("text");

                    b.Property<string>("Scopes")
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Subject")
                        .HasMaxLength(400)
                        .HasColumnType("character varying(400)");

                    b.Property<string>("Type")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationId", "Status", "Subject", "Type");

                    b.ToTable("OpenIddictAuthorizations", "adm");
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreScope", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyToken")
                        .IsConcurrencyToken()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Descriptions")
                        .HasColumnType("text");

                    b.Property<string>("DisplayName")
                        .HasColumnType("text");

                    b.Property<string>("DisplayNames")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<string>("Properties")
                        .HasColumnType("text");

                    b.Property<string>("Resources")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("OpenIddictScopes", "adm");
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreToken", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<string>("ApplicationId")
                        .HasColumnType("text");

                    b.Property<string>("AuthorizationId")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyToken")
                        .IsConcurrencyToken()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<DateTime?>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("ExpirationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Payload")
                        .HasColumnType("text");

                    b.Property<string>("Properties")
                        .HasColumnType("text");

                    b.Property<DateTime?>("RedemptionDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ReferenceId")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Status")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Subject")
                        .HasMaxLength(400)
                        .HasColumnType("character varying(400)");

                    b.Property<string>("Type")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Id");

                    b.HasIndex("AuthorizationId");

                    b.HasIndex("ReferenceId")
                        .IsUnique();

                    b.HasIndex("ApplicationId", "Status", "Subject", "Type");

                    b.ToTable("OpenIddictTokens", "adm");
                });

            modelBuilder.Entity("Lotus.Account.CMessage", b =>
                {
                    b.HasOne("Lotus.Account.CUser", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId");

                    b.HasOne("Lotus.Account.CUser", "Receiver")
                        .WithMany()
                        .HasForeignKey("ReceiverId");

                    b.Navigation("Author");

                    b.Navigation("Receiver");
                });

            modelBuilder.Entity("Lotus.Account.CRolePermission", b =>
                {
                    b.HasOne("Lotus.Account.CPermission", null)
                        .WithMany()
                        .HasForeignKey("PermissionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Lotus.Account.CRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Lotus.Account.CSession", b =>
                {
                    b.HasOne("Lotus.Account.CDevice", "Device")
                        .WithMany("Sessions")
                        .HasForeignKey("DeviceId");

                    b.HasOne("Lotus.Account.CUser", "User")
                        .WithMany("Sessions")
                        .HasForeignKey("UserId");

                    b.Navigation("Device");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Lotus.Account.CUser", b =>
                {
                    b.HasOne("Lotus.Account.CAvatar", "Avatar")
                        .WithMany()
                        .HasForeignKey("AvatarId");

                    b.HasOne("Lotus.Account.CPosition", "Post")
                        .WithMany("Users")
                        .HasForeignKey("PostId");

                    b.HasOne("Lotus.Account.CRole", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId");

                    b.Navigation("Avatar");

                    b.Navigation("Post");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Lotus.Account.CUserFieldActivity", b =>
                {
                    b.HasOne("Lotus.Account.CFieldActivity", null)
                        .WithMany()
                        .HasForeignKey("FieldActivityId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Lotus.Account.CUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Lotus.Account.CUserGroup", b =>
                {
                    b.HasOne("Lotus.Account.CGroup", null)
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Lotus.Account.CUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreAuthorization", b =>
                {
                    b.HasOne("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreApplication", "Application")
                        .WithMany("Authorizations")
                        .HasForeignKey("ApplicationId");

                    b.Navigation("Application");
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreToken", b =>
                {
                    b.HasOne("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreApplication", "Application")
                        .WithMany("Tokens")
                        .HasForeignKey("ApplicationId");

                    b.HasOne("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreAuthorization", "Authorization")
                        .WithMany("Tokens")
                        .HasForeignKey("AuthorizationId");

                    b.Navigation("Application");

                    b.Navigation("Authorization");
                });

            modelBuilder.Entity("Lotus.Account.CDevice", b =>
                {
                    b.Navigation("Sessions");
                });

            modelBuilder.Entity("Lotus.Account.CPosition", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("Lotus.Account.CRole", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("Lotus.Account.CUser", b =>
                {
                    b.Navigation("Sessions");
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreApplication", b =>
                {
                    b.Navigation("Authorizations");

                    b.Navigation("Tokens");
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreAuthorization", b =>
                {
                    b.Navigation("Tokens");
                });
#pragma warning restore 612, 618
        }
    }
}
