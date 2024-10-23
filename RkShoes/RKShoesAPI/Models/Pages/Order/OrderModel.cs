using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Pages.Order
{
    public class OrderModel
    {
        /// <summary>
        /// OrderId
        /// </summary>
        [MaxLength(10)]
        public string OrderId { get; set; } = string.Empty;

        /// <summary>
        /// ManagerId
        /// </summary>
        public int ManagerId { get; set; }

        /// <summary>
        /// UserName
        /// </summary>
        [MaxLength(250)]
        [Required]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// TotalPrice
        /// </summary>
        [Required]
        public double TotalPrice { get; set; }

        /// <summary>
        /// StartDate
        /// </summary>
        public DateTime? StartDate { get; set; } = DateTime.Now;

        /// <summary>
        /// EndDate
        /// </summary>
        public DateTime? EndDate { get; set; }

        /// <summary>
        /// OrderDescription
        /// </summary>
        [MaxLength(500)]
        public string? OrderDes { get; set; } = string.Empty;

        /// <summary>
        /// Status
        /// </summary>
        public int Status { get; set; } = 0;

        /// <summary>
        /// Address
        /// </summary>
        [MaxLength(500)]
        [Required]
        public string Address { get; set; } = string.Empty;

        /// <summary>
        /// PhoneNumber
        /// </summary>
        [MaxLength(11)]
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        /// <summary>
        /// FullName
        /// </summary>
        [MaxLength(500)]
        [Required]
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// PhoneNumber
        /// </summary>
        [Required]
        public string cartId { get; set; } = string.Empty;
    }

    public class OrderDataModel
    {
        public string OrderId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public double TotalPrice { get; set; }
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime? EndDate { get; set; }
        public string? OrderDes { get; set; } = string.Empty;
        public int Status { get; set; } = 0;
        public string Address { get; set; } = string.Empty;
        public List<OrderDetailModel>? orderDetail { get; set; }
    }

}
