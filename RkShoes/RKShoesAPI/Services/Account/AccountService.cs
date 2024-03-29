using RKShoesAPI.IRepository;
using RKShoesAPI.IRepository.IProductRepository;
using RKShoesAPI.Models;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Account;
using RKShoesAPI.Repository.Account;
using RKShoesAPI.Repository.ProductRepository;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text;

namespace RKShoesAPI.Services.Account
{
    public class AccountService
    {
        private readonly IAccountRepository _accountRepository;
        public AccountService()
        {
            _accountRepository = new AccountRepository();
        }

        public bool Login(LoginAccountModel userLogin)
        {
            userLogin.Password = CalculateMD5Hash(userLogin.Password);
            return _accountRepository.Login(userLogin);
        }

        public ValidateResult Validate(LoginAccountModel userLogin)
        {
            ValidateResult validateResult = new ValidateResult();
            if (userLogin == null)
            {
                validateResult.AddError("", "Login error");
                return validateResult;
            }
            if (string.IsNullOrEmpty(userLogin.UserName))
            {
                validateResult.AddError(nameof(LoginAccountModel.UserName), "Username can't be empty");
            }
            else if (userLogin.UserName.Length > 250)
            {
                validateResult.AddError(nameof(LoginAccountModel.UserName), "Maxlenght of user name is 250 character");
            }

            if (string.IsNullOrEmpty(userLogin.Password))
            {
                validateResult.AddError(nameof(LoginAccountModel.Password), "Password can't be empty");
            }
            return validateResult;
        }

        /// <summary>
        /// TODO
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns></returns>
        public bool FogotPassword(LoginAccountModel userLogin)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// TODO
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns></returns>
        public bool ChangePassword(LoginAccountModel userLogin)
        {
            throw new NotImplementedException();
        }

        public bool Regist(AccountModel userRegist)
        {
            try
            {
                userRegist.Password = CalculateMD5Hash(userRegist.Password);
                _accountRepository.Regist(userRegist);
                return true;
            }catch (Exception ex)
            {
                Console.WriteLine($"Error occurred during registration: {ex.Message}");
                return false;
            }
            
        }

        public List<string> VerifyAccount(string userName, string email)
        {
            List<string> list = new List<string>();

            CheckIfExists<AccountModel>(a => a.UserName == userName, "Username is already taken", ref list);
            CheckIfExists<AccountModel>(a => a.Email == email, "Email is already taken", ref list);

            return list;
        }

        private void CheckIfExists<T>(Expression<Func<Customer, bool>> filterExpression, string message, ref List<string> list)
        {
            AccountModel acc = _accountRepository.GetAccount<T>(filterExpression);

            if (acc == null)
            {
                list.Add(null);
            }
            else
            {
                list.Add(message);
            }
        }

        public AccountModel getAccount(string userName)
        {
            return _accountRepository.GetAccount<Customer>(a=> a.UserName==userName);
        }

        public string CalculateMD5Hash(string input)
        {
            using (MD5 md5 = MD5.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                StringBuilder sb = new StringBuilder();

                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("x2"));
                }

                return sb.ToString();
            }
        }
    }
}
