import { QueryCache } from "./QueryCache";
import { Query } from "./Query";
import { generateQueryHash } from "./utils";

/**
 * @implements {import('./types/QueryClient').QueryClient}
 */
export class QueryClient {
  /**
   * @param {import('./types/QueryClient').QueryClientConfig} [config={}]
   */
  constructor(config = {}) {
    /** @type {QueryCache} */
    this.queryCache = new QueryCache();
    this.defaultOptions = {
      staleTime: config.defaultOptions.queries.staleTime || 0,
      gcTime: config.defaultOptions.queries.gcTime || 5 * 60 * 1000, // Default 5 minutes
    };

    // Set up garbage collection
    if (config.gcInterval !== 0) {
      const gcInterval = config.gcInterval || 1 * 60 * 1000; // Default 1 minute
      this.gcInterval = setInterval(() => {
        this.queryCache.runGarbageCollection(this.defaultOptions.gcTime);
      }, gcInterval);
    }
  }

  /**
   * @param {import('./types/utils').QueryOptions} options
   * @returns {Query}
   */
  getQuery(options) {
    const queryHash = generateQueryHash(options.queryKey);
    let query = this.queryCache.get(queryHash);

    if (!query) {
      query = new Query({
        ...options,
        staleTime: options.staleTime ?? this.defaultOptions.staleTime,
        gcTime: options.gcTime ?? this.defaultOptions.gcTime,
      });

      this.queryCache.set(queryHash, query);
    }

    return query;
  }

  /**
   * @template TData
   * @template TError
   * @template {import('./types/utils').QueryKey} TQueryKey
   * @param {import('./types/utils').QueryOptions<TData, TError, TQueryKey>} options
   * @returns {Promise<TData>}
   */
  async fetchQuery(options) {
    const query = this.getQuery(options);
    return query.execute();
  }

  /**
   * @template TData
   * @param {import('./types/utils').QueryKey} queryKey
   * @returns {TData|undefined}
   */
  getQueryData(queryKey) {
    const query = this.queryCache.find(queryKey);
    return query?.data;
  }

  /**
   * @template TData
   * @param {import('./types/utils').QueryKey} queryKey
   * @param {TData|((oldData: TData|undefined) => TData)} updater
   * @returns {TData}
   */
  setQueryData(queryKey, updater) {
    const query = this.getQuery({ queryKey });
    const newData =
      typeof updater === "function" ? updater(query.data) : updater;
    query.setData(newData);
    return newData;
  }

  /**
   * @param {import('./types/utils').QueryKey} queryKey
   * @returns {Promise<void>}
   */
  invalidateQueries(queryKey) {
    const queryHash = generateQueryHash(queryKey);
    const query = this.queryCache.get(queryHash);

    if (query) {
      // Mark as stale by updating lastUpdated to an old time
      query.lastUpdated = new Date(0);
      query.notify();

      // If there are subscribers, trigger a refetch
      if (query.subscribers.length > 0) {
        return query.execute();
      }
    }

    return Promise.resolve();
  }

  /**
   * @param {import('./types/utils').QueryKey} queryKey
   */
  removeQueries(queryKey) {
    const queryHash = generateQueryHash(queryKey);
    return this.queryCache.remove(queryHash);
  }

  /**
   * @returns {void}
   */
  clear() {
    this.queryCache.clear();
  }

  /**
   * @returns {void}
   */
  destroy() {
    if (this.gcInterval) {
      clearInterval(this.gcInterval);
    }
    this.clear();
  }
}

