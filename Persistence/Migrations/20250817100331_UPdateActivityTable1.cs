using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UPdateActivityTable1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityAttendess_Activities_ActivityId",
                table: "ActivityAttendess");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityAttendess_AspNetUsers_UserId",
                table: "ActivityAttendess");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActivityAttendess",
                table: "ActivityAttendess");

            migrationBuilder.RenameTable(
                name: "ActivityAttendess",
                newName: "ActivityAttendees");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityAttendess_ActivityId",
                table: "ActivityAttendees",
                newName: "IX_ActivityAttendees_ActivityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActivityAttendees",
                table: "ActivityAttendees",
                columns: new[] { "UserId", "ActivityId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityAttendees_Activities_ActivityId",
                table: "ActivityAttendees",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityAttendees_AspNetUsers_UserId",
                table: "ActivityAttendees",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityAttendees_Activities_ActivityId",
                table: "ActivityAttendees");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityAttendees_AspNetUsers_UserId",
                table: "ActivityAttendees");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActivityAttendees",
                table: "ActivityAttendees");

            migrationBuilder.RenameTable(
                name: "ActivityAttendees",
                newName: "ActivityAttendess");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityAttendees_ActivityId",
                table: "ActivityAttendess",
                newName: "IX_ActivityAttendess_ActivityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActivityAttendess",
                table: "ActivityAttendess",
                columns: new[] { "UserId", "ActivityId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityAttendess_Activities_ActivityId",
                table: "ActivityAttendess",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityAttendess_AspNetUsers_UserId",
                table: "ActivityAttendess",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
