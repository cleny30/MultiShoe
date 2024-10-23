using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Pages.Product
{
    public class ProductModel
    {
        /// <summary>
        /// ProId
        /// </summary>
        [MaxLength(10)]
        [Required]
        public string ProId { get; set; } = string.Empty;

        /// <summary>
        /// BrandId
        /// </summary>
        [Required]
        public int BrandId { get; set; }

        /// <summary>
        /// CateId
        /// </summary>
        [Required]
        public int CateId { get; set; }

        /// <summary>
        /// Origin
        /// </summary>
        [MaxLength(50)]
        [Required]
        public string Origin { get; set; } = string.Empty;

        /// <summary>
        /// ProName
        /// </summary>
        [MaxLength(50)]
        [Required]
        public string ProName { get; set; } = string.Empty;

        /// <summary>
        /// Quantity
        /// </summary>
        [Required]
        public int Quantity { get; set; }

        /// <summary>
        /// Price
        /// </summary>
        [Required]
        public double Price { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        [MaxLength(500)]
        [Required]
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// Discount
        /// </summary>
        [Required]
        public double Discount { get; set; }

        /// <summary>
        /// RatingAverage
        /// </summary>
        [Required]
        public float RatingAverage { get; set; }

        /// <summary>
        /// IsAvailable
        /// </summary>
        [Required]
        public bool IsAvailable { get; set; } = true;

        /// <summary>
        /// ProImg
        /// </summary>
        [Required]
        public List<string> ProImg { get; set; } =  new List<string>();

        /// <summary>
        /// Size
        /// </summary>
        public List<int> Size { get; set; } = new List<int>();
    }

    
    public class ProductImageModel
    {
        /// <summary>
        /// ProId
        /// </summary>
        
        [MaxLength(10)]
        [Required]
        public string ProId { get; set; } = string.Empty;

        /// <summary>
        /// ProImg
        /// </summary>
        [MaxLength(500)]
        [Required]
        public string ProImg { get; set; } = string.Empty;
    }

    public class ProductSizeModel
    {
        /// <summary>
        /// ProId
        /// </summary>
        [MaxLength(10)]
        [Required]
        public string ProId { get; set; } = string.Empty;

        /// <summary>
        /// Size
        /// </summary>
        [Required]
        public int Size { get; set; }
    }
}
