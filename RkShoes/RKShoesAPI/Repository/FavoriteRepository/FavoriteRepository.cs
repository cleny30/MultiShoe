using ISUZU_NEXT.Server.Core.Extentions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RKShoesAPI.IRepository.IFavoriteRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Favorite;
using RKShoesAPI.Models.Pages.Review;

namespace RKShoesAPI.Repository.FavoriteRepository
{
    public class FavoriteRepository : IFavoriteRepository
    {
        public List<FavoriteModel> GetAllFavorite(string username)
        {
            List<Favorite> favorites = AppDbContext.Instance.Favorite.Where(f => f.UserName == username).ToList();
            List<FavoriteModel> favoriteModels = new List<FavoriteModel>();
            foreach (var f in favorites)
            {
                FavoriteModel favoriteModel = new FavoriteModel();
                favoriteModel.CopyProperties(f);
                favoriteModels.Add(favoriteModel);
            }
            return favoriteModels;
        }
        public int CountFavorite(string username)
        {
            int count = AppDbContext.Instance.Favorite.Count(f => f.UserName == username);
            return count;
        }
        public void AddNewFavorite(FavoriteModel newFavorite)
        {
            string sql = $"INSERT INTO Favorite (UserName, ProId) VALUES (@username, @proid)";
            SqlParameter Username = new SqlParameter("@username", newFavorite.UserName);
            SqlParameter ProId = new SqlParameter("@proid", newFavorite.ProId);
            AppDbContext.Instance.Database.ExecuteSqlRaw(sql,Username, ProId);
        }

        public void RemoveFavorite(FavoriteModel favorite)
        {
            string sql = "DELETE FROM Favorite WHERE UserName = @username AND ProId = @proid";
            SqlParameter usernameParam = new SqlParameter("@username", favorite.UserName);
            SqlParameter proIdParam = new SqlParameter("@proid", favorite.ProId);
            AppDbContext.Instance.Database.ExecuteSqlRaw(sql, usernameParam, proIdParam);
        }
    }
}
