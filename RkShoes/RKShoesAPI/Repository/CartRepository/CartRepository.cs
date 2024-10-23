using ISUZU_NEXT.Server.Core.Extentions;
using Microsoft.EntityFrameworkCore;
using RKShoesAPI.IRepository.ICartRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Cart;
using System;

namespace RKShoesAPI.Repository.CartRepository
{
    public class CartRepository : ICartRepository
    {
        /// <summary>
        /// Method to Add Product to Cart and store it
        /// </summary>
        /// <param name="cartModel"></param>
        public bool AddToCart(CartModel cartModel)
        {
            try
            {
                using (var dbContext = new AppDbContext())
                {
                    Cart cart = new Cart();
                    cart.CopyProperties(cartModel);
                    dbContext.Carts.Add(cart);
                    dbContext.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Get Cart List by Username
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public List<CartModel> GetCartByUsername(string username)
        {
            using (var context = new AppDbContext())
            {
                var carts = context.Carts.Where(c => c.UserName == username).ToList();
                List<CartModel> cartModels = new List<CartModel>();
                foreach (var cart in carts)
                {
                    var cartModel = new CartModel();
                    cartModel.CopyProperties(cart);
                    var picture = context.ProductImage.FirstOrDefault(p => p.ProId == cart.ProId);
                    var product = context.Product.FirstOrDefault(q => q.ProId == cart.ProId);
                    if (picture != null)
                    {
                        cartModel.ProImg = picture.ProImg;
                    }
                    else
                    {
                        cartModel.ProImg = "";
                    }
                    if (product != null && product.Quantity > 0)
                    {
                        cartModel.QuantityInStock = product.Quantity;
                    }
                    cartModels.Add(cartModel);
                }
                return cartModels;
            }
        }
        /// <summary>
        /// Get Cart list by Username and ProId
        /// </summary>
        /// <param name="username"></param>
        /// <param name="proId"></param>
        /// <returns></returns>
        public CartModel? GetCartByUserNameAndProId(string username, string proId)
        {
            using (var context = new AppDbContext())
            {
                var cart = context.Carts.FirstOrDefault(c => c.UserName == username && c.ProId == proId);
                if (cart != null)
                {
                    CartModel cartModel = new CartModel();
                    cartModel.CopyProperties(cart);
                    return cartModel;
                }
                return null;
            }
        }
        /// <summary>
        /// Check Product existing in Cart
        /// </summary>
        /// <param name="username"></param>
        /// <param name="proId"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public CartModel? CheckCartExisting(string username, string proId, int size)
        {
            using (var context = new AppDbContext())
            {
                var cart = context.Carts.FirstOrDefault(c => c.UserName == username && c.ProId == proId && c.Size == size);
                if (cart != null)
                {
                    CartModel cartModel = new CartModel();
                    cartModel.CopyProperties(cart);
                    return cartModel;
                }
                return null;
            }
        }
        /// <summary>
        /// Update quantity in Cart
        /// </summary>
        /// <param name="cartModel"></param>
        public bool UpdateQuantityCart(CartModel cartModel)
        {
            try
            {
                using (var context = new AppDbContext())
                {
                    var cart = context.Carts.FirstOrDefault(c => c.UserName == cartModel.UserName && c.ProId == cartModel.ProId && c.Size == cartModel.Size);
                    if (cart != null)
                    {
                        cart.Quantity = cartModel.Quantity;
                        cart.Price = cartModel.Price;
                        context.SaveChanges();
                        return true;
                    }
                    else { return false; }
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Delete item in Cart
        /// </summary>
        /// <param name="cartModel"></param>
        public void DeleteCart(string username, string proId)
        {
            try
            {
                using (var context = new AppDbContext())
                {
                    var cartmodel = GetCartByUserNameAndProId(username, proId);
                    var cart = new Cart();
                    cart.CopyProperties(cartmodel);
                    if (cart != null)
                    {
                        context.Carts.Remove(cart);
                        context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /// <summary>
        /// Calculate total quantity of Product in Cart
        /// </summary>
        /// <param name="username"></param>
        /// <param name="proId"></param>
        /// <returns></returns>
        public int GetTotalQuantityInCart(string username, string proId)
        {
            using (var context = new AppDbContext())
            {
                return context.Carts.Where(c => c.UserName == username && c.ProId == proId).Sum(c => c.Quantity);
            }
        }

        /// <summary>
        /// Method use to delete all products in cart after checkout 
        /// </summary>
        /// <param name="username"></param>
        /// <param name="proId"></param>
        /// <exception cref="Exception"></exception>
        public void DeleteCartById(string cartId)
        {
            var id = cartId.Split(',');
            try
            {
                using (var context = new AppDbContext())
                {
                    var carts = context.Carts.Where(c => id.Contains(c.CartId.ToString())).ToList();
                    foreach (var cart in carts)
                    {
                        context.Carts.Remove(cart);
                    }
                    context.SaveChanges();

                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
