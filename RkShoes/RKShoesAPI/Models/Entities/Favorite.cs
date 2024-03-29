using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Entities
{
    [Table("Favorite")]
    public class Favorite
    {

        /// <summary>
        /// Id
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Display(Name = "Id")]
        [Key]
        [Required]
        public int Id { get; set; }

        /// <summary>
        /// UserName
        /// </summary>
        [Display(Name = "UserName")]
        [MaxLength(250)]
        [Required]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// ProId
        /// </summary>
        [Display(Name = "ProId")]
        [MaxLength(10)]
        [Required]
        public string ProId { get; set; } = string.Empty;
    }
}
