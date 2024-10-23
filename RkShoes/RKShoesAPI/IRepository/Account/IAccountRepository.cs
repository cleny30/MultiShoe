using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Account;
using System.Linq.Expressions;

namespace RKShoesAPI.IRepository
{
    public interface IAccountRepository
    {
        public bool Login(LoginAccountModel userLogin);
        public bool FogotPassword(LoginAccountModel userLogin);
        public bool ChangePassword(LoginAccountModel userLogin);
        public bool Regist(AccountModel userRegist);
        public AccountModel GetAccount<T>(Expression<Func<Customer, bool>> filterExpression);
    }
}
