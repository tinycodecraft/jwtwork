using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace JwtWork.Abstraction.Tools
{
    public static class DynamicExtensions

    {
        public static readonly MethodInfo ContainsMethod = MethodOf(() => "".Contains(default(string)));
        public static readonly MethodInfo StartsWithMethod = MethodOf(() => "".StartsWith(default(string)));
        public static readonly MethodInfo EndsWithMethod = MethodOf(() => "".EndsWith(default(string)));
        public static readonly MethodInfo AnyMethod = MethodOf(() => Enumerable.Any(default(IEnumerable<object>), default(Func<object, bool>))).GetGenericMethodDefinition();

        public static readonly MethodInfo? likeMethod = typeof(DbFunctionsExtensions).GetMethod("Like", new[] { typeof(DbFunctions), typeof(string), typeof(string) });

        public static MethodInfo MethodOf<T>(Expression<Func<T>> method)
        {
            
            MethodCallExpression mce = (MethodCallExpression)method.Body;
            MethodInfo mi = mce.Method;
            
            return mi;
        }

    }
}
