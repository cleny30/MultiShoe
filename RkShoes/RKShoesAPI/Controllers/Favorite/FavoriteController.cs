using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models.Pages.Favorite;
using RKShoesAPI.Models.Pages.Product;
using RKShoesAPI.Services.FavoriteService;
using RKShoesAPI.Services.Product;

namespace RKShoesAPI.Controllers.Favorite
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly FavoriteService _favoriteService;
        public FavoriteController()
        {
            _favoriteService = new FavoriteService();
        }

        [HttpGet("GetFavorite")]
        public List<ProductModel> GetFavorite(string username)
        {
            return _favoriteService.GetFavoritesByUsername(username);
        }
        [HttpGet("CountFavorite")]
        public int GetFavoriteCount(string username)
        {
            return _favoriteService.GetFavoriteCount(username);
        }
        [HttpPost("AddFavorite")]
        public void AddFavorite([FromBody]FavoriteModel favorite)
        {
            _favoriteService.AddFavorite(favorite);
        }
        [HttpDelete("RemoveFavorite")]
        public void DeleteFavorite(string userName, string proId) {
            _favoriteService.RemoveFavorite(new FavoriteModel { UserName=userName, ProId=proId});
        }
    }
}
