import { cache } from './cache.core.js';

export const setCache = (key, value) => cache.set(key, value);

export const getCache = (key) => cache.get(key);

// export const clearCache = () => ;