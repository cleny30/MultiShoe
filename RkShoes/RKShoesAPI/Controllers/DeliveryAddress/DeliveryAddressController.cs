using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models;
using RKShoesAPI.Models.Pages.DeliveryAddress;
using RKShoesAPI.Services.DeliveryAddressService;

namespace RKShoesAPI.Controllers.DeliveryAddress
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryAddressController : ControllerBase
    {
        private readonly DeliveryAddressService _deliveryAddressService;
        public DeliveryAddressController()
        {
            _deliveryAddressService = new DeliveryAddressService();
        }
        [HttpPost("AddNewAddress")]
        public APIResult AddNewAddress([FromBody] DeliveryAddressModel deliveryAddressModel)
        {
            APIResult result = new APIResult();
            result.IsSuccess = _deliveryAddressService.AddNewAddress(deliveryAddressModel);
            return result;
        }
        [HttpPost("UpdateAddress")]
        public APIResult UpdateAddress([FromBody] DeliveryAddressModel deliveryAddressModel)
        {
            APIResult result = new APIResult();
            result.IsSuccess = _deliveryAddressService.UpdateAddress(deliveryAddressModel);
            return result;
        }
        [HttpDelete("DeleteAddress")]
        public APIResult DeleteAddress(string username, int id)
        {
            APIResult result = new APIResult();
            result.IsSuccess = _deliveryAddressService.DeleteAddress(username,id);
            return result;
        }
        [HttpGet("GetAddressList")]
        public APIResult AddressList(string username)
        {
            APIResult result = new APIResult();
            result.Result = _deliveryAddressService.GetAddressListByUsername(username);
            return result;
        }
    }
}

