import { getCache, setCache } from '../../main/cache/index.js';
import { CACHE_INIT_ADMIN_STATE } from './cache.constant.js';

export const initializeCacheStateHelper = (telegram_id) => {
  setCache(telegram_id, CACHE_INIT_ADMIN_STATE);
};

export const cacheMessageIdsHelper = (telegram_id, messageIdsList) => {
  let cache = getCache(telegram_id);
  cache.messagesIds = [...cache.messagesIds, ...messageIdsList];
  setCache(telegram_id, cache);
};

export const clearCacheMessageIdsHelper = (telegram_id) => {
  let cache = getCache(telegram_id);
  cache.messagesIds = [];
  setCache(telegram_id, cache);
};