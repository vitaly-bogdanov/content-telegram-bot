import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { mainMailingKeyboard } from './mailing.keyboard.js';
import { mailingService } from './mailing.service.js';

export const mailingQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);
  const managers = await mailingService.getManagers();
  let msgId1 = (await this.sendMessage(id, 'Рассылка', mainMailingKeyboard(managers))).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};