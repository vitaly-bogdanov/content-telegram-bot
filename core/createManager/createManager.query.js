import { setCacheMessageIdsHelper, getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getUserHelper } from '../../lib/telegram/index.js';
import { mainCraeteManagerKeyboard } from './createManager.keyboard.js';

export const createQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);

  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(this, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);

  let msgId1 = (await this.sendMessage(id, 'Введите ID менеджера', mainCraeteManagerKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};