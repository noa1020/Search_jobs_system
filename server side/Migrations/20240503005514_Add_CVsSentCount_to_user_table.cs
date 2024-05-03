using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSsearchSystem.Migrations
{
    /// <inheritdoc />
    public partial class Add_CVsSentCount_to_user_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CVsSentCount",
                table: "Users",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CVsSentCount",
                table: "Users");
        }
    }
}
