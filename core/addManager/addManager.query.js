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
    const managerTelegramId = +ctx.text;
    if (await addManagerService.isManagerRegistered(managerTelegramId)) {
      await addManagerService.confirmedByTelegramId(managerTelegramId);
      let msgId3 = (await this.sendMessage(id, 'Менеджер успешно добавден!')).message_id;
      setCacheMessageIdsHelper(id, [msgId3]);
    } else {
      let msgId4 = (await this.sendMessage(id, 'Кажется такого пользователя нет в боте!\nПроверь правильность написания ID')).message_id;
      setCacheMessageIdsHelper(id, [msgId4]);
    }
    setTimeout(() => {
      addManagerQuery.bind(this)(ctx);
    }, 1500);
  });
};