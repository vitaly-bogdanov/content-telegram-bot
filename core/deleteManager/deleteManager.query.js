import { setCacheMessageIdsHelper, getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getUserHelper, deleteMessagesHelper } from '../../lib/telegram/index.js';
import { mainDeleteManagerKeyboard, confirmDeleteManagerKeyboard } from './deleteManager.keyboard.js';
import { deleteManagerService } from './deleteManager.service.js';
import { CONFIRM } from './deleteManager.constant.js';

export const deleteManagerQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(this, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);
  let msgId1 = (await this.sendMessage(id, 'Удаление. Введите ID менеджера 👇', mainDeleteManagerKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
  this.once('message', async (ctx) => {
    let msgId2 = ctx.message_id;
    setCacheMessageIdsHelper(id, [msgId2]);
    const managerTelegramId = +ctx.text;
    let msgId3 = (await this.sendMessage(id, 'Вы уверенны, что хотети удалить данного менеджера❓', confirmDeleteManagerKeyboard)).message_id;
    setCacheMessageIdsHelper(id, [msgId3]);
    this.once('callback_query', async (ctx) => {
      if (await deleteManagerService.isManagerRegistered(managerTelegramId)) {
        switch (ctx.data) {
          case CONFIRM.YES:
            await deleteManagerService.unconfirmedByTelegramId(managerTelegramId);
            let msgId4 = (await this.sendMessage(id, 'Менеджер успешно удален🗑')).message_id;
            setCacheMessageIdsHelper(id, [msgId4]);
            break;
          case CONFIRM.NO:
            let msgId5 = (await this.sendMessage(id, 'Удаление отменено.')).message_id;
            setCacheMessageIdsHelper(id, [msgId5]);
            break;
          default: return;
        }
      } else {
        let msgId6 = (await this.sendMessage(id, 'Кажется такого пользователя нет в боте!\nПроверь правильность написания ID')).message_id;
        setCacheMessageIdsHelper(id, [msgId6]);
      }
      setTimeout(() => {
        deleteManagerQuery.bind(this)(ctx);
      }, 1500);
    });
  });
};