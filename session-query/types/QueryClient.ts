import { QueryKey, QueryOptions } from "./utils";
import { QueryCache, QueryFilters } from "./QueryCache";

interface QueryClientConfig {
  gcInterval?: number;
  defaultOptions?: {
    queries?: {
      staleTime?: number;
      gcTime?: number;
    };
  };
}

export interface QueryClient {
  queryCache: QueryCache;
  defaultOptions: {
    queries: Partial<Omit<QueryOptions, "queryKey" | "queryFn">>;
  };

  constructor(config?: QueryClientConfig): QueryClient;

  mount(): void;
  unmount(): void;
  isFetching(filters?: QueryFilters): number;
  getQueryData<TData = unknown>(queryKey: QueryKey): TData | undefined;
  setQueryData<TData = unknown>(
    queryKey: QueryKey,
    updater: TData | ((oldData: TData | undefined) => TData)
  ): TData;
  getQueriesData<TData = unknown>(filters?: QueryFilters): [QueryKey, TData][];
  setQueriesData<TData = unknown>(
    filters: QueryFilters,
    updater: TData | ((oldData: TData | undefined) => TData)
  ): [QueryKey, TData][];
  invalidateQueries(filters?: QueryFilters): Promise<void>;
  refetchQueries(filters?: QueryFilters): Promise<void>;
  removeQueries(filters?: QueryFilters): void;
  resetQueries(filters?: QueryFilters): Promise<void>;
  cancelQueries(filters?: QueryFilters): Promise<void>;
  fetchQuery<
    TData = unknown,
    TError = Error,
    TQueryKey extends QueryKey = QueryKey
  >(
    options: QueryOptions<TData, TError, TQueryKey>
  ): Promise<TData>;
  prefetchQuery<
    TData = unknown,
    TError = Error,
    TQueryKey extends QueryKey = QueryKey
  >(
    options: QueryOptions<TData, TError, TQueryKey>
  ): Promise<void>;
  clear(): void;
}
