import { getCache, setCache } from '../../main/cache/index.js';
import { CACHE_INIT_ADMIN_STATE } from './cache.constant.js';

export const initializeCacheStateHelper = (telegram_id) => {
  setCache(telegram_id, CACHE_INIT_ADMIN_STATE);
};

export const setAuthAdminCacheHelper = ({ first_name, last_name, username, id, telegram_id }) => {
  let cache = getCache(telegram_id);
  cache.admin = { auth: true, first_name, last_name, username, id, telegram_id };
  setCache(telegram_id, cache);
};

export const clearAuthAdminCacheHelper = (telegram_id) => {
  let cache = getCache(telegram_id);
  cache.admin = CACHE_INIT_ADMIN_STATE.admin;
  setCache(telegram_id, cache);
}

export const setCacheMessageIdsHelper = (telegram_id, messageIdsList) => {
  let cache = getCache(telegram_id);
  cache.messageIds = [...cache.messageIds, ...messageIdsList];
  setCache(telegram_id, cache);
};

export const getCacheMessageIdsHelper = (telegram_id) => { 
  const cache = getCache(telegram_id);
  if (cache) {
    return cache.messageIds;
  }
  return [];
};

export const clearCacheMessageIdsHelper = (telegram_id) => {
  let cache = getCache(telegram_id);
  cache.messageIds = CACHE_INIT_ADMIN_STATE.messageIds;
  setCache(telegram_id, cache);
};