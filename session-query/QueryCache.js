import { generateQueryHash } from "./utils";

/**
 * @implements {import('./types/QueryCache').QueryCache}
 */
export class QueryCache {
  constructor() {
    /** @type {Map<string, import('./Query').Query>} */
    this.queries = new Map();
    /** @type {string} */
    this.storageKey = "session_query_cache";
    this.loadFromStorage();
  }

  /**
   * @private
   */
  loadFromStorage() {
    try {
      const cache = sessionStorage.getItem(this.storageKey);
      if (cache) {
        const parsedCache = JSON.parse(cache);
        Object.entries(parsedCache).forEach(([queryHash, query]) => {
          this.queries.set(queryHash, {
            ...query,
            subscribers: [],
            lastUpdated: new Date(query.lastUpdated),
          });
        });
      }
    } catch (error) {
      console.error("Failed to load query cache from sessionStorage:", error);
    }
  }

  /**
   * @private
   */
  saveToStorage() {
    try {
      const cacheToSave = {};
      this.queries.forEach((query, queryHash) => {
        // Don't store subscribers in sessionStorage
        const { subscribers, ...queryToStore } = query;
        cacheToSave[queryHash] = queryToStore;
      });
      sessionStorage.setItem(this.storageKey, JSON.stringify(cacheToSave));
    } catch (error) {
      console.error("Failed to save query cache to sessionStorage:", error);
    }
  }

  /**
   * @param {string} queryHash
   * @returns {import('./Query').Query|undefined}
   */
  get(queryHash) {
    return this.queries.get(queryHash);
  }

  /**
   * @param {string} queryHash
   * @param {import('./Query').Query} query
   * @returns {import('./Query').Query}
   */
  set(queryHash, query) {
    this.queries.set(queryHash, query);
    this.saveToStorage();
    return query;
  }

  /**
   * @param {string} queryHash
   * @returns {boolean}
   */
  remove(queryHash) {
    const exists = this.queries.delete(queryHash);
    if (exists) {
      this.saveToStorage();
    }
    return exists;
  }

  /**
   * @param {import('./types/utils').QueryKey} queryKey
   * @returns {import('./Query').Query|undefined}
   */
  find(queryKey) {
    const queryHash = generateQueryHash(queryKey);
    return this.get(queryHash);
  }

  /**
   * @param {string} queryHash
   * @param {number} [staleTime=0]
   * @returns {boolean}
   */
  isDataFresh(queryHash, staleTime = 0) {
    const query = this.get(queryHash);
    if (!query) return false;

    const now = new Date().getTime();
    const lastUpdated = query.lastUpdated.getTime();
    return now - lastUpdated < staleTime;
  }

  /**
   * @returns {void}
   */
  clear() {
    this.queries.clear();
    sessionStorage.removeItem(this.storageKey);
  }

  /**
   * @param {number} [gcTime=5 * 60 * 1000]
   * @returns {void}
   */
  runGarbageCollection(gcTime = 5 * 60 * 1000) {
    // Default 5 minutes
    const now = new Date().getTime();

    this.queries.forEach((query, queryHash) => {
      const lastUpdated = query.lastUpdated.getTime();
      const hasNoSubscribers = query.subscribers.length === 0;

      if (hasNoSubscribers && now - lastUpdated > gcTime) {
        this.remove(queryHash);
      }
    });
  }
}

const queryCache = new QueryCache({});
