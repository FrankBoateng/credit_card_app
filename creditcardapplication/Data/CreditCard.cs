using System.ComponentModel.DataAnnotations;

namespace creditcardapplication.Data
{
    internal sealed class CreditCard
    {
        [Key]
        public int CardId { get; set; }

        [Required]
        [MaxLength(50)]
        public string CardHolderName { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string CardNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string CardType { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public string ExpireDate { get; set; } = string.Empty;

        [Required]
        [MaxLength(5)]
        public string SecurityCode { get; set; } = string.Empty;
    }
}
