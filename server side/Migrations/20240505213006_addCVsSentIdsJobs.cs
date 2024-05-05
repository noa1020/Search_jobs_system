using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSsearchSystem.Migrations
{
    /// <inheritdoc />
    public partial class addCVsSentIdsJobs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CVsSentIdsJobs",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CVsSentIdsJobs",
                table: "Users");
        }
    }
}
