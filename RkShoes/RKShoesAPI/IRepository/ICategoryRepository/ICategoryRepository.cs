using RKShoesAPI.Models.Pages.Category;

namespace RKShoesAPI.IRepository.ICategoryRepository
{
    public interface ICategoryRepository
    {
        public List<CategoryModel> GetCategories();
        public CategoryModel GetCategoryById(int id);
    }
}
