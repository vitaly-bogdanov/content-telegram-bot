import { setCacheMessageIdsHelper, getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getUserHelper, deleteMessagesHelper } from '../../lib/telegram/index.js';
import { mainMailingKeyboard, managerConfigKeyboard } from './mailing.keyboard.js';
import { mailingService } from './mailing.service.js';

export const mailingQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);

  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(this, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);

  const managers = await mailingService.getManagers();
  let msgIds = [];
  for (let manager of managers) {
    const managerDescription = `${manager.first_name} ${manager.last_name}\n@${manager.username}\nID: ${manager.telegram_id}`;
    let msgId = (await this.sendMessage(id, managerDescription, managerConfigKeyboard(manager.username))).message_id;
    msgIds.push(msgId);
  }
  setCacheMessageIdsHelper(id, msgIds);

  let msgId1 = (await this.sendMessage(id, 'Рассылка', mainMailingKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};