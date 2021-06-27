import { setCacheMessageIdsHelper, getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getUserHelper, deleteMessagesHelper } from '../../lib/telegram/index.js';
import { mainDeleteManagerKeyboard } from './deleteManager.keyboard.js';

export const deleteManagerQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);

  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(this, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);

  let msgId1 = (await this.sendMessage(id, 'Удаление. Введите ID менеджера', mainDeleteManagerKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]); 
};