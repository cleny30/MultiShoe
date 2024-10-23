using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models;
using RKShoesAPI.Models.Pages.Search;
using RKShoesAPI.Services.SearchService;

namespace RKShoesAPI.Controllers.SearchProduct
{
    [Route("api/[controller]")]
    public class SearchProductController : ControllerBase
    {
        [HttpGet]
        public APIResult Index(string searchTerm)
        {
            SearchService searchService = new SearchService();

            SearchModel model = searchService.GetData(searchTerm);

            APIResult aPIResult = new APIResult();

            aPIResult.Result = model;
            return aPIResult;
        }
    }
}
