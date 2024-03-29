using ISUZU_NEXT.Server.Core.Extentions;
using RKShoesAPI.IRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Account;
using System.Linq.Expressions;

namespace RKShoesAPI.Repository.Account
{
    public class AccountRepository : IAccountRepository
    {
        /// <summary>
        /// TODO
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public bool ChangePassword(LoginAccountModel userLogin)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// TODO
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public bool FogotPassword(LoginAccountModel userLogin)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// TODO
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public bool Login(LoginAccountModel userLogin)
        {
            using AppDbContext dbContext = AppDbContext.Instance;
            var user = dbContext.UserAccounts.SingleOrDefault(d => d.UserName == userLogin.UserName && d.Password == userLogin.Password);
            return user != null;
        }

        /// <summary>
        /// TODO
        /// </summary>
        /// <param name="userRegist"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public bool Regist(AccountModel userRegist)
        {
            try
            {
                using (var context = new AppDbContext())
                {
                    Customer customer = new Customer();

                    customer.CopyProperties(userRegist);

                    context.UserAccounts.Add(customer);

                    context.SaveChanges();
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public AccountModel GetAccount<T>(Expression<Func<Customer, bool>> filterExpression)
        {

            Customer? customer = AppDbContext.Instance.UserAccounts.SingleOrDefault(filterExpression);

            if (customer != null)
            {
                var account = new AccountModel();
                account.CopyProperties(customer);
                return account;
            }

            return null;
        }

    }
}
