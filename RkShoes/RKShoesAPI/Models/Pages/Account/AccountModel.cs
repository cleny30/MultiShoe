using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Pages.Account
{
    public class LoginAccountModel
    {
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
        /// Password
        /// </summary>
        [MaxLength(250)]
        public string? RePassword { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        [MaxLength(250)]
        public string? OldPassword { get; set; }
    }
    public class AccountModel
    {
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
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// PhoneNumber
        /// </summary>
        [MaxLength(11)]
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        /// <summary>
        /// Email
        /// </summary>
        [MaxLength(250)]
        [Required]
        public string Email { get; set; } = string.Empty;

    }
}
