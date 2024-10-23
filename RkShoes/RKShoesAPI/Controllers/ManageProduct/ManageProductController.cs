using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models.Pages.Product;
using RKShoesAPI.Models.Pages.Review;
using RKShoesAPI.Services.Product;
using RKShoesAPI.Services.Review;

namespace RKShoesAPI.Controllers.Dashboard
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageProductController : ControllerBase
    {
        private readonly ProductService _productService;
        public ManageProductController()
        {
            _productService = new ProductService();
        }
        [HttpPost("AddProduct")]
        public void AddProduct([FromBody] ProductModel product)
        {
            _productService.AddProduct(product);
        }
        [HttpPost("UpdateProduct")]
        public void UpdateProduct([FromBody] ProductModel product)
        {
            _productService.UpdateProduct(product);
        }
        [HttpDelete("DeleteProduct")]
        public void DeleteProduct([FromBody] string productId)
        {
            _productService.DeleteProduct(productId);
        }
    }
}
