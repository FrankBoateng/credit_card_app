using Microsoft.EntityFrameworkCore;

namespace creditcardapplication.Data
{
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<CreditCard> CreditCards { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContext) => dbContext.UseSqlite("Data Source=./Data/AppDatabase.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            CreditCard[] creditCards = new CreditCard[2];

            for (int i = 1; i <= 2; i++)
            {
                creditCards[i - 1] = new CreditCard
                {
                    CardId = i,
                    CardHolderName = $"Frank Boateng",
                    CardNumber = $"421024523562523",
                    CardType = $"VISA",
                    ExpireDate = $"10/25",
                    SecurityCode = $"456"
                };
            }

            modelBuilder.Entity<CreditCard>().HasData(creditCards);
        }
    }
}