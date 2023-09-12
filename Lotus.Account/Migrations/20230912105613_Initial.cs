using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Lotus.Account.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "security");

            migrationBuilder.EnsureSchema(
                name: "adm");

            migrationBuilder.CreateTable(
                name: "OpenIddictApplications",
                schema: "security",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ClientId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ClientSecret = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyToken = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ConsentType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    DisplayName = table.Column<string>(type: "text", nullable: true),
                    DisplayNames = table.Column<string>(type: "text", nullable: true),
                    Permissions = table.Column<string>(type: "text", nullable: true),
                    PostLogoutRedirectUris = table.Column<string>(type: "text", nullable: true),
                    Properties = table.Column<string>(type: "text", nullable: true),
                    RedirectUris = table.Column<string>(type: "text", nullable: true),
                    Requirements = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictApplications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OpenIddictScopes",
                schema: "security",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ConcurrencyToken = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Descriptions = table.Column<string>(type: "text", nullable: true),
                    DisplayName = table.Column<string>(type: "text", nullable: true),
                    DisplayNames = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Properties = table.Column<string>(type: "text", nullable: true),
                    Resources = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictScopes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserFieldActivity",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFieldActivity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserGroup",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserNotification",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Topic = table.Column<string>(type: "text", nullable: true),
                    Sender = table.Column<string>(type: "text", nullable: true),
                    Importance = table.Column<int>(type: "integer", nullable: true),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    IsArchive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserNotification", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserPermission",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPermission", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserPosition",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPosition", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OpenIddictAuthorizations",
                schema: "security",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ApplicationId = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyToken = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Properties = table.Column<string>(type: "text", nullable: true),
                    Scopes = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Subject = table.Column<string>(type: "character varying(400)", maxLength: 400, nullable: true),
                    Type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictAuthorizations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpenIddictAuthorizations_OpenIddictApplications_Application~",
                        column: x => x.ApplicationId,
                        principalSchema: "security",
                        principalTable: "OpenIddictApplications",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Login = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Email = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    Name = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Surname = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Patronymic = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Birthday = table.Column<DateOnly>(type: "date", nullable: true),
                    RoleId = table.Column<int>(type: "integer", nullable: true),
                    RoleSystemName = table.Column<string>(type: "text", nullable: false),
                    PostId = table.Column<int>(type: "integer", nullable: true),
                    AvatarId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_UserPosition_PostId",
                        column: x => x.PostId,
                        principalSchema: "adm",
                        principalTable: "UserPosition",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_User_UserRole_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "adm",
                        principalTable: "UserRole",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserRolePermissionRelation",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    PermissionId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRolePermissionRelation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRolePermissionRelation_UserPermission_PermissionId",
                        column: x => x.PermissionId,
                        principalSchema: "adm",
                        principalTable: "UserPermission",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserRolePermissionRelation_UserRole_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "adm",
                        principalTable: "UserRole",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OpenIddictTokens",
                schema: "security",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ApplicationId = table.Column<string>(type: "text", nullable: true),
                    AuthorizationId = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyToken = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ExpirationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Payload = table.Column<string>(type: "text", nullable: true),
                    Properties = table.Column<string>(type: "text", nullable: true),
                    RedemptionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ReferenceId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Subject = table.Column<string>(type: "character varying(400)", maxLength: 400, nullable: true),
                    Type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpenIddictTokens_OpenIddictApplications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalSchema: "security",
                        principalTable: "OpenIddictApplications",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OpenIddictTokens_OpenIddictAuthorizations_AuthorizationId",
                        column: x => x.AuthorizationId,
                        principalSchema: "security",
                        principalTable: "OpenIddictAuthorizations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserFieldActivityRelation",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FieldActivityId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFieldActivityRelation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserFieldActivityRelation_UserFieldActivity_FieldActivityId",
                        column: x => x.FieldActivityId,
                        principalSchema: "adm",
                        principalTable: "UserFieldActivity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserFieldActivityRelation_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "adm",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserGroupRelation",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GroupId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroupRelation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserGroupRelation_UserGroup_GroupId",
                        column: x => x.GroupId,
                        principalSchema: "adm",
                        principalTable: "UserGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserGroupRelation_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "adm",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserMessage",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    Time = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    ReceiverId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMessage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserMessage_User_AuthorId",
                        column: x => x.AuthorId,
                        principalSchema: "adm",
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserMessage_User_ReceiverId",
                        column: x => x.ReceiverId,
                        principalSchema: "adm",
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "UserGroup",
                columns: new[] { "Id", "DisplayName", "Name" },
                values: new object[,]
                {
                    { 1, "Хранители", "Хранители" },
                    { 2, "Север", "Север" },
                    { 3, "Юг", "Юг" },
                    { 4, "Восток", "Восток" },
                    { 5, "Запад", "Запад" }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "UserPermission",
                columns: new[] { "Id", "DisplayName", "Name" },
                values: new object[,]
                {
                    { 1, "Администратор", "admin" },
                    { 2, "Модератор", "editor" },
                    { 3, "Пользователь", "user" }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "UserPosition",
                columns: new[] { "Id", "DisplayName", "Name" },
                values: new object[,]
                {
                    { 1, "Инспектор", "Инспектор" },
                    { 2, "Старший инспектор", "Старший инспектор" },
                    { 3, "Ведущий специалист", "Ведущий специалист" },
                    { 4, "Начальник отдела", "Начальник отдела" }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "UserRole",
                columns: new[] { "Id", "DisplayName", "Name" },
                values: new object[,]
                {
                    { 1, "Администратор", "admin" },
                    { 2, "Редактор", "editor" },
                    { 3, "Пользователь", "user" }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "User",
                columns: new[] { "Id", "AvatarId", "Birthday", "Email", "EmailConfirmed", "Login", "Name", "PasswordHash", "Patronymic", "PostId", "RoleId", "RoleSystemName", "Surname" },
                values: new object[] { new Guid("e3182c8f-87bc-4e27-a27f-b32e3e2b8018"), null, null, "dementevds@gmail.com", false, "DanielDem", "Даниил", "012f28fd2973783520fa3115f886102a09c8a15e", "Сергеевич", null, 1, "Нет роли", "Дементьев" });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "UserRolePermissionRelation",
                columns: new[] { "Id", "PermissionId", "RoleId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 2, 2 },
                    { 3, 3, 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictApplications_ClientId",
                schema: "security",
                table: "OpenIddictApplications",
                column: "ClientId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictAuthorizations_ApplicationId_Status_Subject_Type",
                schema: "security",
                table: "OpenIddictAuthorizations",
                columns: new[] { "ApplicationId", "Status", "Subject", "Type" });

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictScopes_Name",
                schema: "security",
                table: "OpenIddictScopes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictTokens_ApplicationId_Status_Subject_Type",
                schema: "security",
                table: "OpenIddictTokens",
                columns: new[] { "ApplicationId", "Status", "Subject", "Type" });

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictTokens_AuthorizationId",
                schema: "security",
                table: "OpenIddictTokens",
                column: "AuthorizationId");

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictTokens_ReferenceId",
                schema: "security",
                table: "OpenIddictTokens",
                column: "ReferenceId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_PostId",
                schema: "adm",
                table: "User",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_User_RoleId",
                schema: "adm",
                table: "User",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFieldActivityRelation_FieldActivityId",
                schema: "adm",
                table: "UserFieldActivityRelation",
                column: "FieldActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFieldActivityRelation_UserId",
                schema: "adm",
                table: "UserFieldActivityRelation",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupRelation_GroupId",
                schema: "adm",
                table: "UserGroupRelation",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupRelation_UserId",
                schema: "adm",
                table: "UserGroupRelation",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMessage_AuthorId",
                schema: "adm",
                table: "UserMessage",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMessage_ReceiverId",
                schema: "adm",
                table: "UserMessage",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRolePermissionRelation_PermissionId",
                schema: "adm",
                table: "UserRolePermissionRelation",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRolePermissionRelation_RoleId",
                schema: "adm",
                table: "UserRolePermissionRelation",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OpenIddictScopes",
                schema: "security");

            migrationBuilder.DropTable(
                name: "OpenIddictTokens",
                schema: "security");

            migrationBuilder.DropTable(
                name: "UserFieldActivityRelation",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserGroupRelation",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserMessage",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserNotification",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserRolePermissionRelation",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "OpenIddictAuthorizations",
                schema: "security");

            migrationBuilder.DropTable(
                name: "UserFieldActivity",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserGroup",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "User",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserPermission",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "OpenIddictApplications",
                schema: "security");

            migrationBuilder.DropTable(
                name: "UserPosition",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserRole",
                schema: "adm");
        }
    }
}
