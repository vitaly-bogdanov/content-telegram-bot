import { setCacheMessageIdsHelper, getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getUserHelper, deleteMessagesHelper } from '../../lib/telegram/index.js';
import { mainAddManagerKeyboard } from './addManager.keyboard.js';
import { addManagerService } from './addManager.service.js';

export const addManagerQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);

  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(this, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);

  let msgId1 = (await this.sendMessage(id, 'Добавление. Введите ID менеджера', mainAddManagerKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);

  this.once('message', async (ctx) => {
    let msgId2 = ctx.message_id;
    setCacheMessageIdsHelper(id, [msgId2]);
    const managerTelegramId = ctx.text;

    let result = await addManagerService.confirmedByTelegramId(managerTelegramId);

    console.log(result);
    // проверить есть ли id
    // если есть то
  });
};