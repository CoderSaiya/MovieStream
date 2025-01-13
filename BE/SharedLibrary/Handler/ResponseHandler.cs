using System.Collections.Concurrent;

namespace SharedLibrary.Handler
{
    public class ResponseHandler
    {
        private readonly ConcurrentDictionary<string, TaskCompletionSource<object>> _pendingProcess = new();
        
        public Task<object> WaitForResponseAsync(string correclationId, int timeOut)
        {
            var tcs = new TaskCompletionSource<object>();
            _pendingProcess[correclationId] = tcs;

            _ = Task.Delay(timeOut).ContinueWith(_ =>
            {
                if(_pendingProcess.TryRemove(correclationId, out var pendingTask))
                {
                    tcs.TrySetResult(null);
                }
            });

            return tcs.Task;
        }

        public void SetResponse(string correclationId, object response)
        {
            if(_pendingProcess.TryRemove(correclationId, out var pendingTask))
            {
                pendingTask.SetResult(response);
            }
        }
    }
}
