using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RKShoesAPI.Models.Entities
{
    [Table("Customer")]
    public class Customer
    {
        #region property

        /// <summary>
        /// UserName
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Display(Name = "UserName")]
        [MaxLength(250)]
        [Key]
        [Required]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// Password
        /// </summary>
        [Display(Name = "Password")]
        [MaxLength(250)]
        [Required]
        public string Password { get; set; } = string.Empty;

        /// <summary>
        /// FullName
        /// </summary>
        [Display(Name = "FullName")]
        [MaxLength(500)]
        [Required]
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// PhoneNumber
        /// </summary>
        [Display(Name = "PhoneNumber")]
        [MaxLength(11)]
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        /// <summary>
        /// Email
        /// </summary>
        [Display(Name = "Email")]
        [MaxLength(250)]
        [Required]
        public string Email { get; set; } = string.Empty;
        #endregion
    }
}