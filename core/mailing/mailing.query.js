import { setCacheMessageIdsHelper, getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getUserHelper, deleteMessagesHelper } from '../../lib/telegram/index.js';
import { mainMailingKeyboard } from './mailing.keyboard.js';

export const mailingQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);

  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(this, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);

  let msgId1 = (await this.sendMessage(id, 'Рассылка', mainMailingKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};