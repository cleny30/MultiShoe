using ISUZU_NEXT.Server.Core.Extentions;
using RKShoesAPI.IRepository.IFavoriteRepository;
using RKShoesAPI.IRepository.IProductRepository;
using RKShoesAPI.Models.Pages.Favorite;
using RKShoesAPI.Models.Pages.Product;
using RKShoesAPI.Repository.FavoriteRepository;
using RKShoesAPI.Repository.ProductRepository;
using RKShoesAPI.Services.Product;
using System.Collections.Generic;

namespace RKShoesAPI.Services.FavoriteService
{
    public class FavoriteService
    {
        private readonly IFavoriteRepository _favoriteRepository;
        public FavoriteService()
        {
            _favoriteRepository = new FavoriteRepository();
        }

        public List<ProductModel> GetFavoritesByUsername(string username)
        {
            ProductService _productService = new ProductService();
            List<FavoriteModel> favoriteProducts = _favoriteRepository.GetAllFavorite(username);
            List<ProductModel> favoriteProductDetails = new List<ProductModel>();
            foreach (var favorite in favoriteProducts)
            {
                ProductModel productDetail = _productService.GetProductById(favorite.ProId);
                if (productDetail != null)
                {
                    favoriteProductDetails.Add(productDetail);
                }
            }
            return favoriteProductDetails;
        }
        public int GetFavoriteCount(string username)
        {
            return _favoriteRepository.CountFavorite(username);
        }
        public void AddFavorite(FavoriteModel favorite)
        {
            _favoriteRepository.AddNewFavorite(favorite);
        }
        public void RemoveFavorite(FavoriteModel favorite)
        {
            _favoriteRepository.RemoveFavorite(favorite);
        }
    }
}
