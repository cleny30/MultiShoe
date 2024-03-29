using ISUZU_NEXT.Server.Core.Extentions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RKShoesAPI.IRepository.IProductRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Product;
using System;
using System.Security.Cryptography;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace RKShoesAPI.Repository.ProductRepository
{
    public class ProductRepository : IProductRepository
    {
        public List<ProductModel> GetProduct()
        {
            List<Product> products = AppDbContext.Instance.Product.ToList();
            List<ProductModel> ProductModels = new List<ProductModel>();

            foreach (var product in products)
            {
                ProductModel ProductModel = new ProductModel();
                ProductModel.CopyProperties(product);
                ProductModels.Add(ProductModel);
            }
            return ProductModels;
        }
        public ProductModel GetProductById(string id)
        {
            var product = AppDbContext.Instance.Product.FirstOrDefault(p => p.ProId == id);
            var productModel = new ProductModel();
            productModel.CopyProperties(product);
            return productModel;
        }

        public List<ProductModel> GetProductByCateId(int cateId)
        {
            var products = AppDbContext.Instance.Product.Where(p => p.CateId == cateId).ToList();
            List<ProductModel> ProductModels = new List<ProductModel>();
            foreach (var product in products)
            {
                ProductModel ProductModel = new ProductModel();
                ProductModel.CopyProperties(product);
                ProductModels.Add(ProductModel);
            }
            return ProductModels;
        }

        /// <summary>
        /// Method to add new Product 
        /// </summary>
        /// <param name="product"></param>
        public void AddProduct(ProductModel newProduct)
        {
            using (var context = new AppDbContext())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        Product pro = new Product();
                        pro.CopyProperties(newProduct);
                        context.Product.Add(pro);
                  
                        var newImages = new List<ProductImage>();

                        // Add new image for product
                        foreach (var proImgUrl in newProduct.ProImg)
                        {
                            var newImage = new ProductImage
                            {
                                ProId = newProduct.ProId,
                                ProImg = proImgUrl
                            };
                            newImages.Add(newImage);
                        }
                        context.ProductImage.AddRange(newImages);

                        var newSizes = new List<ProductSize>();
                        foreach (var proSize in newProduct.Size)
                        {
                            var newSize = new ProductSize
                            {
                                ProId = newProduct.ProId,
                                Size = proSize

                            };
                            newSizes.Add(newSize);  
                        }
                        context.ProductSize.AddRange(newSizes);

                        context.SaveChanges();
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new Exception(ex.Message);
                    }
                }
            }
        }
        /// <summary>
        /// Method use to Update Product's Infomation
        /// </summary>
        /// <param name="updatedProduct"></param>
        public void UpdateProduct(ProductModel updatedProduct)
        {
            using (var context = new AppDbContext())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        var existingProduct = context.Product.FirstOrDefault(p => p.ProId == updatedProduct.ProId);
                        if (existingProduct != null)
                        {
                            // Update product infomation
                            existingProduct.CopyProperties(updatedProduct);
                         
                            // Delete product's images in database
                            string deleteImagesQuery = "DELETE FROM ProductImage WHERE ProId = @ProId";
                            SqlParameter proIdParamImg = new SqlParameter("@ProId", updatedProduct.ProId);
                            context.Database.ExecuteSqlRaw(deleteImagesQuery, proIdParamImg);

                            // Delete product's sizes in database
                            string deleteSizesQuery = "DELETE FROM ProductSize WHERE ProId = @ProId";
                            SqlParameter proIdParamSize = new SqlParameter("@ProId", updatedProduct.ProId);
                            context.Database.ExecuteSqlRaw(deleteSizesQuery, proIdParamSize);
                            var newImages = new List<ProductImage>();

                            // Add new image for product
                            foreach (var proImgUrl in updatedProduct.ProImg)
                            {
                                var newImage = new ProductImage
                                {
                                    ProId = updatedProduct.ProId,
                                    ProImg = proImgUrl
                                };
                                newImages.Add(newImage);
                            }
                            context.ProductImage.AddRange(newImages);
                            var newSizes = new List<ProductSize>();
                            foreach (var proSize in updatedProduct.Size)
                            {
                                var newSize = new ProductSize
                                {
                                    ProId = updatedProduct.ProId,
                                    Size = proSize

                                };
                                newSizes.Add(newSize);
                            }
                            context.ProductSize.AddRange(newSizes);
                            context.SaveChanges();
                            transaction.Commit();
                        }
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new Exception(ex.Message);
                    }
                }
            }
        }
        /// <summary>
        /// Method use to delete product
        /// </summary>
        /// <param name="productId"></param>
        public void DeleteProduct(string productId)
        {
            using (var context = new AppDbContext())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        var productToDelete = context.Product.FirstOrDefault(p => p.ProId == productId);

                        string deleteImagesQuery = "DELETE FROM ProductImage WHERE ProId = @ProId";
                        SqlParameter proIdParamImg = new SqlParameter("@ProId", productId);
                        context.Database.ExecuteSqlRaw(deleteImagesQuery, proIdParamImg);

                        string deleteSizesQuery = "DELETE FROM ProductSize WHERE ProId = @ProId";
                        SqlParameter proIdParamSize = new SqlParameter("@ProId", productId);
                        context.Database.ExecuteSqlRaw(deleteSizesQuery, proIdParamSize);

                        context.Product.Remove(productToDelete);
                        context.SaveChanges();
                        transaction.Commit();

                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new Exception(ex.Message);
                    }
                }
            }
        }
        /// <summary>
        /// This method use to auto generate ProId 
        /// </summary>
        /// <param name="cateId"></param>
        /// <returns></returns>
        public string GetNewProductID(int cateId)
        {
            using (var context = new AppDbContext())
            {
                // Find a newest ProductId by cateId
                var largestProductId = context.Product.Where(p => p.CateId == cateId).OrderByDescending(p => p.ProId).Select(p => p.ProId).FirstOrDefault();

                if (largestProductId == null)
                {
                    // If have no product, it will take Keyword of that category
                    var categoryKeyword = context.Category
                        .Where(c => c.CateId == cateId)
                        .Select(c => c.KeyWord)
                        .FirstOrDefault();

                    if (categoryKeyword != null)
                    {
                        //Generate new proId by using Keyword + 001
                        // ex: Sneaker = SN  => SN001
                        int newNumber = 1;
                        string newProductId = $"{categoryKeyword}{newNumber:D3}"; // length = 3 digit, ex: 001, 002...
                        return newProductId;
                    }
                }
                else
                {
                    // Cut Keyword to get numberId of product
                    string numericPart = largestProductId.Substring(2);
                    int currentNumber = int.Parse(numericPart);
                    int newNumber = currentNumber + 1;
                    string newProductId = $"{largestProductId.Substring(0, 2)}{newNumber:D3}";
                    return newProductId;
                }
                return largestProductId;
            }
        }
        /// <summary>
        /// Method use to update quantity of product after checkout.
        /// </summary>
        /// <param name="productModel"></param>
        /// <returns></returns>
        public bool UpdateQuantityProduct(ProductModel productModel)
        {
            try
            {
                using (var dbContext = new AppDbContext())
                {
                    var product = dbContext.Product.FirstOrDefault(p => p.ProId == productModel.ProId);
                    if (product != null)
                    {
                        product.Quantity = productModel.Quantity; 
                        dbContext.SaveChanges();
                        return true;
                    }
                    else
                    {
                        return false; // Product not found
                    }
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
