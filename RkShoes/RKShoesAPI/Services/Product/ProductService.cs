using BusinessObject;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Product
{
    public class ProductService
    {
        private SqlConnection conn;
        private SqlCommand _command;
        private SqlDataReader _reader;
        public ProductService()
        {
            conn = DbConnection.GetConnection();
            _command = new SqlCommand();
            _command.Connection = conn;
        }

        private static ProductService instance;

        public static ProductService Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new ProductService();
                }
                return instance;
            }
        }

        public List<Product> GetAllProduct()
        {
            List<Product> list = new List<Product>();
            _command.CommandText = "Select * from Product";
            _command.Parameters.Clear();
            using (_reader = _command.ExecuteReader())
            {
                while (_reader.Read())
                {
                    Product pro = new Product();
                    pro.pro_id = _reader.GetString(0);
                    pro.brand_id = _reader.GetInt32(1);
                    pro.cate_id = _reader.GetInt32(2);
                    pro.pro_name = _reader.GetString(3);
                    pro.pro_quan = _reader.GetInt32(4);
                    pro.pro_price = double.Parse(_reader.GetValue(5).ToString());
                    pro.pro_des = _reader.GetString(6);
                    pro.discount = _reader.GetInt32(7);
                    pro.rating_average = _reader.GetDouble(8);
                    pro.isAvailable = _reader.GetBoolean(9);
                    list.Add(pro);
                }
            }
            foreach (var item in list)
            {
                _command.CommandText = "SELECT * FROM Product_Image WHERE pro_id = '" + item.pro_id + "'";
                //_command.Parameters.AddWithValue("@pro_id", item.pro_id);
                _command.Parameters.Clear();
                using (_reader = _command.ExecuteReader())
                {
                    while (_reader.Read())
                    {
                        item.pro_img.Add(_reader.GetString(1));
                    }
                }
            }

            foreach (var item in list)
            {
                _command.CommandText = "Select * from Size where pro_id = '" + item.pro_id + "'";
                //_command.Parameters.AddWithValue("@pro_id", item.pro_id);
                _command.Parameters.Clear();
                using (_reader = _command.ExecuteReader())
                {
                    while (_reader.Read())
                    {
                        item.size.Add(_reader.GetInt64(1));
                    }
                }
            }
            return list;
        }

        public List<Category> GetAllCategory()
        {
            List<Category> list = new List<Category>();
            _command.CommandText = "Select * from Category";
            using (_reader = _command.ExecuteReader())
            {
                while (_reader.Read())
                {
                    Category cat = new Category();
                    cat.cate_id = _reader.GetInt32(0);
                    cat.cate_name = _reader.GetString(1);
                    cat.isAvailable = _reader.GetBoolean(2);
                    cat.keyword = _reader.GetString(3);
                    list.Add(cat);
                }
            }
            return list;
        }

        public List<Brand> GetAllBrand()
        {
            List<Brand> list = new List<Brand>();
            _command.CommandText = "Select * from Brand";
            using (_reader = _command.ExecuteReader())
            {
                while (_reader.Read())
                {
                    Brand brand = new Brand();
                    brand.brand_id = _reader.GetInt32(0);
                    brand.brand_name = _reader.GetString(1);
                    brand.isAvailable = _reader.GetBoolean(3);
                    brand.brand_img = _reader.GetString(2);
                    list.Add(brand);
                }
            }
            return list;
        }

    }
}
