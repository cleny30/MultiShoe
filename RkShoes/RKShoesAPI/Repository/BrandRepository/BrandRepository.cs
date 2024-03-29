using ISUZU_NEXT.Server.Core.Extentions;
using Microsoft.EntityFrameworkCore;
using RKShoesAPI.IRepository.IBrandRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Brand;

namespace RKShoesAPI.Repository.BrandRepository
{
    public class BrandRepository : IBrandRepository
    {
        public List<BrandModel> GetBrands()
        {
            List<Brand> brands = AppDbContext.Instance.Brand.ToList();
            List<BrandModel> brandModels = new List<BrandModel>();

            foreach (var brand in brands)
            {
                BrandModel brandModel = new BrandModel();
                brandModel.CopyProperties(brand);
                brandModels.Add(brandModel);
            }
            return brandModels;
        }
        public BrandModel GetBrandById(int id)
        {
            var brand = AppDbContext.Instance.Brand.FirstOrDefault(b => b.BrandId == id);
            var brandModel = new BrandModel();
            brandModel.CopyProperties(brand);

            return brandModel;
        }
    }
}
