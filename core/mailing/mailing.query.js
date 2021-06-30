import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { mainMailingKeyboard, managerConfigKeyboard } from './mailing.keyboard.js';
import { mailingService } from './mailing.service.js';

export const mailingQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);

  const managers = await mailingService.getManagers();
  let msgIds = [];
  for (let manager of managers) {
    const managerDescription = `${manager.first_name} ${manager.last_name}\nID: ${manager.telegram_id}`;
    let msgId1 = (await this.sendMessage(id, managerDescription)).message_id;
    msgIds.push(msgId1);
    let msgId2 = (await this.sendMessage(id, manager.username, managerConfigKeyboard)).message_id;
    msgIds.push(msgId2);
  }
  setCacheMessageIdsHelper(id, msgIds);
  let msgId1 = (await this.sendMessage(id, 'Рассылка', mainMailingKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};