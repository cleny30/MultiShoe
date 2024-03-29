using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Entities
{
    [Table("Manager")]
    public class Manager
    {
        #region property


        /// <summary>
        /// ManagerId
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Display(Name = "ManagerId")]
        [Key]
        [Required]
        public int ManagerId { get; set; }

        /// <summary>
        /// UserName
        /// </summary>
        [Display(Name = "UserName")]
        [MaxLength(250)]
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
        /// Fullname
        /// </summary>
        [Display(Name = "Fullname")]
        [MaxLength(500)]
        [Required]
        public string Fullname { get; set; } = string.Empty;

        /// <summary>
        /// PhoneNumber
        /// </summary>
        [Display(Name = "PhoneNumber")]
        [MaxLength(11)]
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        /// <summary>
        /// SSN
        /// </summary>
        [Display(Name = "SSN")]
        [MaxLength(11)]
        [Required]
        public string SSN { get; set; } = string.Empty;

        /// <summary>
        /// Address
        /// </summary>
        [Display(Name = "Address")]
        [MaxLength(500)]
        [Required]
        public string Address { get; set; } = string.Empty;

        /// <summary>
        /// Email
        /// </summary>
        [Display(Name = "Email")]
        [MaxLength(250)]
        [Required]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// IsAdmin
        /// </summary>
        [Display(Name = "IsAdmin")]
        [Required]
        public bool IsAdmin { get; set; } = false;
        #endregion
    }
}
