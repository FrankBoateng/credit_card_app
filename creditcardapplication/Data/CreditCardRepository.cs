using Microsoft.EntityFrameworkCore;

namespace creditcardapplication.Data
{
    internal static class CreditCardRepository
    {
        internal async static Task<List<CreditCard>> GetCreditCardsAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.CreditCards.ToListAsync();
            }
        }

        internal async static Task<CreditCard> GetCreditCardByIdAsync(int cardId)
        {
            using (var db = new AppDBContext())
            {
                return await db.CreditCards
                    .FirstOrDefaultAsync(creditCard => creditCard.CardId == cardId);
            }
        }

        internal async static Task<bool> AddCreditCardsAsync(CreditCard addCard)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.AddAsync(addCard);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> UpdateCreditCardsAsync(CreditCard updateCard)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.CreditCards.Update(updateCard);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> DeleteCreditCardsAsync(int cardId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    CreditCard creditCard = await GetCreditCardByIdAsync(cardId);
                    db.CreditCards.Update(creditCard);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
    }
}