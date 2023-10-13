using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace JwtWork.Abstraction.Tools
{
    public static class IdGenerator
    {
        private static int _counter;

        private static SemaphoreSlim _lock = new SemaphoreSlim(1);


        public static async void GetLock()
        {
            await _lock.WaitAsync();
        }

        public static void Release()
        {
            _lock.Release();
        }

        public static uint GetNewId()
        {
            uint newId = unchecked((uint)System.Threading.Interlocked.Increment(ref _counter));
            if (newId == 0)
            {
                _counter = 0;
                return GetNewId();
                //throw new System.Exception("Whoops, ran out of identifiers");
            }
            return newId;
        }
    }
    public static class UtilExtensions
    {


        

        public static async Task CopyToAsync(this Stream source, Stream destination, IProgress<long> progress, CancellationToken cancellationToken = default(CancellationToken), int bufferSize = 0x1000)
        {
            var buffer = new byte[bufferSize];
            int bytesRead;
            long totalRead = 0;
            while ((bytesRead = await source.ReadAsync(buffer, 0, buffer.Length, cancellationToken)) > 0)
            {
                await destination.WriteAsync(buffer, 0, bytesRead, cancellationToken);
                cancellationToken.ThrowIfCancellationRequested();
                totalRead += bytesRead;
                Thread.Sleep(10);
                progress.Report(totalRead);
            }
        }

        /// <summary>
        /// The RandomString.
        /// </summary>
        /// <param name="size">The size<see cref="int"/>.</param>
        /// <returns>The <see cref="string"/>.</returns>
        public static string RandomString(this string me, int size = 5)
        {
            StringBuilder sb = new StringBuilder();

            int myIntValue = unchecked((int)DateTime.Now.Ticks + me.GetHashCode());
            myIntValue = unchecked(myIntValue + (int)IdGenerator.GetNewId());
            var rnd = new Random(myIntValue);
            for (int i = 0; i < size; i++)
            {


                sb.Append(Convert.ToChar(rnd.Next(65, 90)));
            }

            return sb.ToString().ToLowerInvariant();
        }

        public static bool HasError(this string error)
        {
            return !string.IsNullOrWhiteSpace(error);
        }
    }
}
