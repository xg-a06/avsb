import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Router from './routes';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          console.log('重试');
        }}
      >
        <Suspense fallback={<div>loading...</div>}>
          <QueryClientProvider client={queryClient}>
            <Router />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;
