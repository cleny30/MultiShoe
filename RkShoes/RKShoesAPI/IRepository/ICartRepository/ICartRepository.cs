using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Cart;

namespace RKShoesAPI.IRepository.ICartRepository
{
    public interface ICartRepository
    {
        public bool AddToCart(CartModel cartModel);
        public bool UpdateQuantityCart(CartModel cartModel);
        public List<CartModel> GetCartByUsername(string username);
        public void DeleteCart(string username, string proId);
        public CartModel? GetCartByUserNameAndProId(string username, string proId);
        public CartModel? CheckCartExisting(string username, string proId, int size);
        public int GetTotalQuantityInCart(string username, string proId);
        public void DeleteCartById(string cartId);
    }
}
