using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Cart;
using RKShoesAPI.Services.Cart;
using RKShoesAPI.Services.Product;

namespace RKShoesAPI.Controllers.Cart
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;
        public CartController()
        {
            _cartService = new CartService();
        }

        [HttpPost("AddToCart")]
        public APIResult AddToCart([FromBody] CartModel cart)
        {
            APIResult result = new APIResult();
            result.IsSuccess = _cartService.AddToCart(cart);
            return result;
        }
        [HttpGet("GetCartByUserName")]
        public APIResult GetCartByUsername(string username)
        {
            APIResult result = new APIResult();
             result.Result = _cartService.GetCartByUsername(username);
            return result;
        }

        [HttpDelete("DeleteItemInCart")]
        public APIResult DeleteCart(string username, string proId)
        {
            APIResult result = new APIResult();
            result.IsSuccess = _cartService.DeleteCart(username, proId);
            return result;
        }
        [HttpPost("UpdateItemInCart")]
        public APIResult UpdateCart(CartModel cartModel)
        {
            APIResult result = new APIResult();
            result.IsSuccess = _cartService.UpdateCart(cartModel);
            return result;
        }
    }
}
