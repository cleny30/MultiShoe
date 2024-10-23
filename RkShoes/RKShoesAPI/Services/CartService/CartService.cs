using RKShoesAPI.IRepository.ICartRepository;
using RKShoesAPI.Models.Pages.Cart;
using RKShoesAPI.Repository.CartRepository;
using RKShoesAPI.Services.Product;

namespace RKShoesAPI.Services.Cart
{
    public class CartService
    {
        private readonly ICartRepository _cartRepository;
        public CartService()
        {
            _cartRepository = new CartRepository();
        }
        public bool AddToCart(CartModel cartModel)
        {
            ProductService _productService = new ProductService();
            var pro = _productService.GetProductById(cartModel.ProId);
            var existingCartItem = _cartRepository.CheckCartExisting(cartModel.UserName, cartModel.ProId, cartModel.Size);
            int totalQuantityInCart = _cartRepository.GetTotalQuantityInCart(cartModel.UserName, cartModel.ProId);

            // if Cart is not null => update Quantity
            if (existingCartItem != null)
            {
                var updatedQuantity = existingCartItem.Quantity + cartModel.Quantity;
                if (updatedQuantity > pro.Quantity || totalQuantityInCart + cartModel.Quantity > pro.Quantity || pro.Quantity <= 0)
                {
                    return false; // out of stock
                }
                float discount = (float)(pro.Discount / 100f);
                float updatePrice = (float)((pro.Price * updatedQuantity) * (1 - discount));
                cartModel.Price = updatePrice;
                cartModel.Quantity = updatedQuantity;
                var result = _cartRepository.UpdateQuantityCart(cartModel);
            }
            else
            {
                if (pro == null || totalQuantityInCart + cartModel.Quantity > pro.Quantity || pro.Quantity <= 0)
                {
                    return false; // Out of stock
                }
                string productName = pro.ProName;
                float discount = (float)(pro.Discount / 100f);
                float totalPrice = (float)((pro.Price * cartModel.Quantity) * (1 - discount));
                cartModel.Price = totalPrice;
                cartModel.ProName = productName;
                _cartRepository.AddToCart(cartModel);
            }
            return true;
        }

        public List<CartModel> GetCartByUsername(string username)
        {
            return _cartRepository.GetCartByUsername(username);
        }
        public bool DeleteCart(string username, string proId)
        {
            _cartRepository.DeleteCart(username, proId);
            return true;
        }
        public bool UpdateCart(CartModel cartModel)
        {
            ProductService _productService = new ProductService();
            var pro = _productService.GetProductById(cartModel.ProId);
            if (pro == null || pro.Quantity <= 0 || pro.Quantity < cartModel.Quantity)
            {
                return false;
            }
            else
            {
                float discount = (float)(pro.Discount / 100f);
                float totalPrice = (float)((pro.Price * cartModel.Quantity) * (1 - discount));
                cartModel.Price = totalPrice;
                _cartRepository.UpdateQuantityCart(cartModel);
                return true;
            }
        }
        public bool DeleteCartById(string cartId)
        {
            _cartRepository.DeleteCartById(cartId);
            return true;
        }
    }
}
