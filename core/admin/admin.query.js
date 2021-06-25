import { getCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { setCacheMessageIdsHelper, getCacheMessageIdsHelper } from '../../lib/cache/index.js';

export const adminQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(this, id, cacheMessageIds);
  let msgId1 = (await this.sendMessage(id, 'Главное меню', mainAdminKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
}