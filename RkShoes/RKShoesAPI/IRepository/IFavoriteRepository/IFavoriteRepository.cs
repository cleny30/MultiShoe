using RKShoesAPI.Models.Pages.Favorite;

namespace RKShoesAPI.IRepository.IFavoriteRepository
{
    public interface IFavoriteRepository
    {
        public List<FavoriteModel> GetAllFavorite(string username);
        public int CountFavorite(string username);
        public void AddNewFavorite(FavoriteModel newFavorite);
        public void RemoveFavorite(FavoriteModel model);
    }
}
