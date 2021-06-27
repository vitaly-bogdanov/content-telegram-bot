import { getUserHelper, deleteMessagesHelper } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper, getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { mainCategoriesKeyboard } from './categories.keyboard.js';

const categories = async function(ctx) {
  const { id } = getUserHelper(ctx);

  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(this, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);

  
};