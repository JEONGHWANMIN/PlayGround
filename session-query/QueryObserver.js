/**
 * @implements {import('./types/QueryObserver').QueryObserver}
 * @template TData
 * @template TError
 * @template {import('./types/utils').QueryKey} TQueryKey
 */
export class QueryObserver {
  /**
   * @param {import('./types/QueryClient').QueryClient} queryClient
   * @param {import('./types/QueryObserver').QueryObserverOptions<TData, TError, TQueryKey>} options
   */
  constructor(queryClient, options) {
    this.queryClient = queryClient;
    this.options = options;
    /** @type {import('./Query').Query<TData, TError, TQueryKey>|null} */
    this.currentQuery = null;
    /** @type {import('./types/QueryObserver').QueryObserverListener<TData, TError>|null} */
    this.listener = null;
  }

  /**
   * @param {import('./types/QueryObserver').QueryObserverListener<TData, TError>} listener
   * @returns {() => void}
   */
  subscribe(listener) {
    this.listener = listener;
    this.setUpQuery();
    return () => this.unsubscribe();
  }

  /**
   * @returns {void}
   */
  unsubscribe() {
    if (this.currentQuery) {
      this.currentQuery.removeSubscriber(this);
    }
    this.listener = null;
  }

  /**
   * @returns {import('./types/utils').QueryResult<TData, TError>}
   */
  setUpQuery() {
    const query = this.queryClient.getQuery(this.options);

    if (this.currentQuery !== query) {
      // Unsubscribe from old query
      if (this.currentQuery) {
        this.currentQuery.removeSubscriber(this);
      }

      // Subscribe to new query
      this.currentQuery = query;
      this.currentQuery.addSubscriber(this);
    }

    // Fetch if needed (stale or no data)
    if (this.shouldFetch()) {
      this.queryClient.fetchQuery(this.options);
    }

    return this.getResult();
  }

  /**
   * @returns {boolean}
   */
  shouldFetch() {
    return (
      !this.currentQuery.data ||
      this.currentQuery.isStale() ||
      this.currentQuery.status === "error"
    );
  }

  /**
   * @returns {void}
   */
  onQueryUpdate() {
    if (this.listener) {
      this.listener(this.getResult());
    }
  }

  /**
   * @returns {import('./types/utils').QueryResult<TData, TError>}
   */
  getResult() {
    return {
      data: this.currentQuery.data,
      error: this.currentQuery.error,
      status: this.currentQuery.status,
      isLoading: this.currentQuery.status === "loading",
      isError: this.currentQuery.status === "error",
      isSuccess: this.currentQuery.status === "success",
      refetch: () => this.queryClient.fetchQuery(this.options),
    };
  }
}
