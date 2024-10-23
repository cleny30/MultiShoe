using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models.Pages.Product;
using RKShoesAPI.Services.Product;
namespace RKShoesAPI.Controllers.ProductDetail
{
    [Route("api/[controller]")]
    public class ProductDetailController : ControllerBase
    {
        private readonly ProductService _productService;
        public ProductDetailController()
        {
            _productService = new ProductService();
        }
        [HttpGet("ProductDetail")]
        public ProductDetailModel ProductDetail(string proId)
        {
            return _productService.GetProductDetail(proId);
        }

    }
}
