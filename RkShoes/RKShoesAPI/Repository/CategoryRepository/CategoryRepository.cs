using ISUZU_NEXT.Server.Core.Extentions;
using Microsoft.EntityFrameworkCore;
using RKShoesAPI.IRepository.ICategoryRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Brand;
using RKShoesAPI.Models.Pages.Category;

namespace RKShoesAPI.Repository.CategoryRepository
{
    public class CategoryRepository:ICategoryRepository
    {
        public List<CategoryModel> GetCategories()
        {
            List<Category> categories = AppDbContext.Instance.Category.ToList();
            List<CategoryModel> categoryModels = new List<CategoryModel>();

            foreach (var category in categories)
            {
                CategoryModel categoryModel = new CategoryModel();
                categoryModel.CopyProperties(category);
                categoryModels.Add(categoryModel);
            }
            return categoryModels;
        }

        public CategoryModel GetCategoryById(int id)
        {
            var cate = AppDbContext.Instance.Category.FirstOrDefault(b => b.CateId == id);
            var cateModel = new CategoryModel();
            cateModel.CopyProperties(cate);
            return cateModel;
        }
    }
}
