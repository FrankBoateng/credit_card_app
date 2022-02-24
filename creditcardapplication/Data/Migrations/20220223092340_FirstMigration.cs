using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace creditcardapplication.Data.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CreditCards",
                columns: table => new
                {
                    CardId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CardHolderName = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    CardNumber = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    CardType = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    ExpireDate = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false),
                    SecurityCode = table.Column<string>(type: "TEXT", maxLength: 5, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CreditCards", x => x.CardId);
                });

            migrationBuilder.InsertData(
                table: "CreditCards",
                columns: new[] { "CardId", "CardHolderName", "CardNumber", "CardType", "ExpireDate", "SecurityCode" },
                values: new object[] { 1, "Frank Boateng 1", "421024523562523 1", "VISA 1", "10/25 1", "456 1" });

            migrationBuilder.InsertData(
                table: "CreditCards",
                columns: new[] { "CardId", "CardHolderName", "CardNumber", "CardType", "ExpireDate", "SecurityCode" },
                values: new object[] { 2, "Frank Boateng 2", "421024523562523 2", "VISA 2", "10/25 2", "456 2" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CreditCards");
        }
    }
}
