import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { mainDeleteManagerKeyboard, confirmDeleteManagerKeyboard } from './deleteManager.keyboard.js';
import { deleteManagerService } from './deleteManager.service.js';
import { CONFIRM } from './deleteManager.constant.js';

export const deleteManagerQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);
  let msgId1 = (await this.sendMessage(id, 'Удаление. Введите ID менеджера 👇', mainDeleteManagerKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
  this.once('message', async (ctx) => {
    let msgId2 = ctx.message_id;
    setCacheMessageIdsHelper(id, [msgId2]);
    const managerTelegramId = +ctx.text;
    if (await deleteManagerService.isManagerRegistered(managerTelegramId)) {
      let msgId3 = (await this.sendMessage(id, 'Вы уверенны, что хотети удалить данного менеджера❓', confirmDeleteManagerKeyboard)).message_id;
      setCacheMessageIdsHelper(id, [msgId3]);
      this.once('callback_query', async (ctx) => {
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
        setTimeout(() => {
          deleteManagerQuery.bind(this)(ctx);
        }, 1500);
      });
    } else {
      let msgId6 = (await this.sendMessage(id, 'Кажется такого пользователя нет в боте!\nПроверь правильность написания ID')).message_id;
      setCacheMessageIdsHelper(id, [msgId6]);
      setTimeout(() => {
        deleteManagerQuery.bind(this)(ctx);
      }, 1500);
    }
  });
};