import { QueryKey, QueryOptions } from "./utils";
import { Query, QueryCacheNotifyEvent } from "./Query";

export interface QueryCacheConfig {
  onError?: (error: Error, query: Query<unknown, Error>) => void;
}

export interface QueryCacheListener {
  (event: QueryCacheNotifyEvent): void;
}

export interface QueryFilters {
  queryKey?: QueryKey;
  exact?: boolean;
  type?: "active" | "inactive" | "all";
  stale?: boolean;
  fetchStatus?: "fetching" | "paused" | "idle";
}

export interface QueryCache {
  config: QueryCacheConfig;
  queries: Map<string, Query<any, any>>;
  listeners: Set<QueryCacheListener>;

  build<TData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>(
    client: any,
    options: QueryOptions<TData, TError, TQueryKey>
  ): Query<TData, TError, TQueryKey>;

  add(query: Query<any, any>): void;
  remove(query: Query<any, any>): void;
  get<TData = unknown, TError = Error>(
    queryHash: string
  ): Query<TData, TError> | undefined;
  find<TData = unknown, TError = Error>(
    filters: QueryFilters
  ): Query<TData, TError> | undefined;
  findAll(filters?: QueryFilters): Query<any, any>[];
  notify(event: QueryCacheNotifyEvent): void;
  subscribe(listener: QueryCacheListener): () => void;
  clear(): void;
}
