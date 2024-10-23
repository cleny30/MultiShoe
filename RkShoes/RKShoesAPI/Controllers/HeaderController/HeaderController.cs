using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models;
using RKShoesAPI.Services.HeaderService;

namespace RKShoesAPI.Controllers.HeaderController
{
    [Route("api/[controller]")]
    public class HeaderController : ControllerBase
    {
        [HttpGet]
        public APIResult Index()
        {
            HeaderService headerService = new HeaderService();
            APIResult APIResult = new APIResult();
            APIResult.Result = headerService.GetData();
            return APIResult;
        }
    }
}
