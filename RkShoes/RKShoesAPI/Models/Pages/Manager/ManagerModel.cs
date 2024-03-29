using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Pages.Manager
{
    public class ManagerModel
    {
        /// <summary>
        /// ManagerId
        /// </summary>
        [Key]
        [Required]
        public int ManagerId { get; set; }

        /// <summary>
        /// UserName
        /// </summary>
        [MaxLength(250)]
        [Required]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// Password
        /// </summary>
        [MaxLength(250)]
        [Required]
        public string Password { get; set; } = string.Empty;

        /// <summary>
        /// Fullname
        /// </summary>
        [MaxLength(500)]
        [Required]
        public string Fullname { get; set; } = string.Empty;

        /// <summary>
        /// PhoneNumber
        /// </summary>
        [MaxLength(11)]
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        /// <summary>
        /// SSN
        /// </summary>
        [MaxLength(11)]
        [Required]
        public string SSN { get; set; } = string.Empty;

        /// <summary>
        /// Address
        /// </summary>
        /// 
        [MaxLength(500)]
        [Required]
        public string Address { get; set; } = string.Empty;

        /// <summary>
        /// Email
        /// </summary>

        [MaxLength(250)]
        [Required]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// IsAdmin
        /// </summary>

        [Required]
        public bool IsAdmin { get; set; } = false;
    }
}
