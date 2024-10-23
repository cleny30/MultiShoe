using BusinessObject;
using DataAccess.DAOs;
using DataAccess.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class ProductRepository : IProductRepository
    {
        public List<Brand> GetAllBrand() => ProductService.Instance.GetAllBrand();

        public List<Category> GetAllCategory() => ProductService.Instance.GetAllCategory();

        public List<Product> GetAllProduct() => ProductService.Instance.GetAllProduct();

    }
}
