using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models;
using RKShoesAPI.Models.Pages.Shop;
using RKShoesAPI.Services.Shop;

namespace RKShoesAPI.Controllers.Shop
{
    [Route("api/[controller]")]
    public class ShopController : ControllerBase
    {
        [HttpGet]
        public APIResult Index()
        {
            ShopService shopService = new ShopService();

            ShopModel model = shopService.GetData();
            
            APIResult aPIResult = new APIResult();

            aPIResult.Result = model;
            return aPIResult;
        }
    }
}
