using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Pages.Favorite
{
    public class FavoriteModel
    {   
        /// <summary>
        /// UserName
        /// </summary>

        [MaxLength(250)]
        [Required]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// ProId
        /// </summary>

        [MaxLength(10)]
        [Required]
        public string ProId { get; set; } = string.Empty;
    }
}
