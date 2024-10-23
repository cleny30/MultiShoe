using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models;
using RKShoesAPI.Services.HomeService;

namespace RkShoesAPI.Controllers
{
    [Route("api/[controller]")]

    public class HomeController : Controller
    {
        [HttpGet("HomePage")]
        public APIResult Index(int deviceType)
        {
            HomeService homeService = new HomeService();
            APIResult APIResult = new APIResult();
            APIResult.Result = homeService.GetData(deviceType);
            return APIResult;
        }
    }
}
