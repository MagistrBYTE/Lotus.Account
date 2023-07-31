using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lotus.Account.Migrations
{
    public partial class AddNotification : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notification",
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
                    table.PrimaryKey("PK_Notification", x => x.Id);
                });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("e3182c8f-87bc-4e27-a27f-b32e3e2b8018"),
                column: "RoleSystemName",
                value: "admin");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notification",
                schema: "adm");

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("e3182c8f-87bc-4e27-a27f-b32e3e2b8018"),
                column: "RoleSystemName",
                value: "Нет роли");
        }
    }
}
