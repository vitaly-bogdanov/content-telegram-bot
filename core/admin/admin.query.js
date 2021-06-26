import { setCacheMessageIdsHelper, getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getUserHelper, deleteMessagesHelper } from '../../lib/telegram/index.js';
import { mainAdminKeyboard } from './admin.keyboard.js';

export const adminQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);

  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(this, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);
  
  let msgId1 = (await this.sendMessage(id, 'Главное меню', mainAdminKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};