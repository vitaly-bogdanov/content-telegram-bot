import { setCacheMessageIdsHelper, getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getUserHelper, deleteMessagesHelper } from '../../lib/telegram/index.js';
import { mainDeleteManagerKeyboard } from './deleteManager.keyboard.js';
import { deleteManagerService } from './deleteManager.service.js';

export const deleteManagerQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);

  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(this, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);

  let msgId1 = (await this.sendMessage(id, 'Удаление. Введите ID менеджера', mainDeleteManagerKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);

  this.once('message', async (ctx) => {
    let msgId2 = ctx.message_id;
    setCacheMessageIdsHelper(id, [msgId2]);
    const managerTelegramId = +ctx.text;
    if (await deleteManagerService.isManagerRegistered(managerTelegramId)) {
      await deleteManagerService.unconfirmedByTelegramId(managerTelegramId);
      let msgId3 = (await this.sendMessage(id, 'Менеджер успешно удален!')).message_id;
      setCacheMessageIdsHelper(id, [msgId3]);
    } else {
      let msgId4 = (await this.sendMessage(id, 'Кажется такого пользователя нет в боте!\nПроверь правильность написания ID')).message_id;
      setCacheMessageIdsHelper(id, [msgId4]);
    }
    setTimeout(() => {
      deleteManagerQuery.bind(this)(ctx);
    }, 1500);
  });


};