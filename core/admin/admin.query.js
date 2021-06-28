import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { mainAdminKeyboard } from './admin.keyboard.js';

export const adminQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this ,id);
  
  let msgId1 = (await this.sendMessage(id, 'Главное меню', mainAdminKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};