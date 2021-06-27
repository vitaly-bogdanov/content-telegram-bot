import { setCacheMessageIdsHelper, getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getUserHelper, deleteMessagesHelper } from '../../lib/telegram/index.js';
import { mainCraeteManagerKeyboard } from './createManager.keyboard.js';

export const createManagerQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);

  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(this, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);

  let msgId1 = (await this.sendMessage(id, 'Добавление. Введите ID менеджера', mainCraeteManagerKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);

  this.once('message', async (ctx) => {
    let msgId2 = ctx.message_id;
    const managerTelegramId = ctx.text;

    // проверить есть ли id
    // если есть то
    
    console.log(managerTelegramId);
  });
};