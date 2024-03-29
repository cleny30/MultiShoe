using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models;
using RKShoesAPI.Models.Pages.Cart;
using RKShoesAPI.Models.Pages.Order;
using RKShoesAPI.Services.Cart;
using RKShoesAPI.Services.OrderService;

namespace RKShoesAPI.Controllers.Order
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
        public OrderController()
        {
            _orderService = new OrderService();
        }

        [HttpPost("CheckOut")]
        public APIResult CheckOut([FromBody]OrderModel order)
        {
            APIResult result = new APIResult();
            result.IsSuccess = _orderService.Checkout(order);
            return result;
        }
        [HttpGet("GetOrderByUsername")]
        public APIResult GetOrderListByUsername(string username)
        {
            APIResult result = new APIResult();
            result.Result = _orderService.GetOrdersByCustomer(username);
            return result;
        }
        [HttpGet("AcceptOrder")]
        public APIResult AcceptOrder(string orderID, int managerId)
        {
            APIResult result = new APIResult();
            result.IsSuccess = _orderService.AcceptOrder(orderID, managerId);
            return result;
        }
        [HttpGet("ShippingOrder")]
        public APIResult ShippingOrder(string orderID)
        {
            APIResult result = new APIResult();
            result.IsSuccess = _orderService.ShippingOrder(orderID);
            return result;
        }
        [HttpGet("CompleteOrder")]
        public APIResult CompleteOrder(string orderID)
        {
            APIResult result = new APIResult();
            result.IsSuccess = _orderService.CompleteOrder(orderID);
            return result;
        }
        [HttpGet("CancelOrder")]
        public APIResult CancelOrder(string orderID)
        {
            APIResult result = new APIResult();
            result.IsSuccess = _orderService.CancelOrder(orderID);
            return result;
        }
    }
}
