using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.Common;
using RKShoesAPI.Models.Entities;

namespace ISUZU_NEXT.Server.Core.Extentions
{
    public static class DBHelperExtentions
    {
        public static List<T> RawSqlQuery<T>(string query, List<SqlParameter> parameters, Func<DbDataReader, T> map)
        {
            using AppDbContext dbContext = AppDbContext.Instance;
            using var command = dbContext.Database.GetDbConnection().CreateCommand();
            command.CommandText = query;
            command.CommandType = CommandType.Text;
            command.Parameters.AddRange(parameters.ToArray());

            DbConnection connection = dbContext.Database.GetDbConnection();
            connection.Open();

            using var result = command.ExecuteReader();
            var entities = new List<T>();

            if (!result.HasRows)
                return entities;

            while (result.Read())
            {
                entities.Add(map(result));
            }

            connection.Close();
            return entities;
        }

        public static List<T> RawSqlQueryToEntities<T>(string query, List<SqlParameter> parameters)
        {
            using AppDbContext dbContext = AppDbContext.Instance;
            using var command = dbContext.Database.GetDbConnection().CreateCommand();
            command.CommandText = query;
            command.CommandType = CommandType.Text;
            command.Parameters.AddRange(parameters.ToArray());

            DbConnection connection = dbContext.Database.GetDbConnection();
            connection.Open();

            using var result = command.ExecuteReader();
            List<T> entities = new();

            if (!result.HasRows) 
                return entities;

            while (result.Read())
            {
                T entity = Activator.CreateInstance<T>();
                var colSchema = result.GetColumnSchema();
                entity?.GetType().GetProperties().ToList().ForEach(prop =>
                {
                    if (colSchema.Any(x => x.ColumnName == prop.Name))
                    {
                        prop.SetValue(entity, result.GetValue(prop.Name) == DBNull.Value ? default : result.GetValue(prop.Name));
                    }
                });
                entities.Add(entity);
            }

            command.Parameters.Clear();
            connection.Close();
            return entities;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyName"></param>
        /// <returns></returns>
        public static object? GetProperty<T>(this T data,string propertyName)
        {
            var property = data?.GetType()?.GetProperty(propertyName);
            if (property == null)
            {
                return null;
            }

            return property.GetValue(data);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyName"></param>
        /// <param name="value"></param>
        public static void SetProperty<T>(this T data, string propertyName, object? value)
        {
            var property = data ?.GetType().GetProperty(propertyName);
            if (property == null)
            {
                return;
            }

            var oldValue = data.GetProperty(propertyName);
            if (object.Equals(value, oldValue))
            {
                return;
            }

            var propertyType = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
            try
            {
                var safeValue = (value == null) ? null : Convert.ChangeType(value, propertyType);
                property.SetValue(data, safeValue);
            }
            catch
            {
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <param name="value"></param>
        public static void CopyProperties<TModel, KModel>(this TModel model, KModel value)
        {
            if (model == null || value == null)
            {
                return;
            }

            var destProperties = model.GetType().GetProperties()
                                        .Where(p => p.CanWrite)
                                        .ToDictionary(p => p.Name);

            foreach (var property in value.GetType().GetProperties())
            {
                if (destProperties.TryGetValue(property.Name, out var destProperty))
                {
                    if (destProperty.PropertyType == property.PropertyType)
                    {
                        destProperty.SetValue(model, property.GetValue(value));
                    }
                }
            }
        }
    }
}
