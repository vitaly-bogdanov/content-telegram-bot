import { getUserHelper, deleteMessagesHelper } from '../../lib/telegram/index.js';
import { adminService } from './admin.service.js';
import { mainAdminKeyboard } from './admin.keyboard.js';
import { setCacheMessageIdsHelper, initializeCacheStateHelper, getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../../lib/cache/index.js';

export const adminCommand = async function(ctx) {
  const { id, first_name, last_name, username } = getUserHelper(ctx);
  const cacheMessageIds = getCacheMessageIdsHelper(id);
  if (cacheMessageIds.length) await deleteMessagesHelper(this, id, cacheMessageIds);
  initializeCacheStateHelper(id);
  const isRegistered = await adminService.isRegistered(id); 
  if (!isRegistered) await adminService.registration({ id, first_name, last_name, username });
  let text = `Добро пожаловать!\nваш ID: ${id}`;
  let msgId1 = (await this.sendMessage(id, text)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
  this.once('message', async (ctx) => {
    let msgId2 = ctx.message_id;
    await this.deleteMessage(id, msgId2);
    const password = ctx.text;
    let loginSuccess = await adminService.login(id, password);
    if (loginSuccess) { // успешная авторизация
      await deleteMessagesHelper(this, id, getCacheMessageIdsHelper(id));
      clearCacheMessageIdsHelper(id);
      let msgId3 = (await this.sendMessage(id, 'Главное меню', mainAdminKeyboard)).message_id;
      setCacheMessageIdsHelper(id, [msgId3]);
    } else { // неверный пароль
      let msgId4 = (await this.sendMessage(id, `Неверный пароль для ID: ${id}`)).message_id;
      setCacheMessageIdsHelper(id, [msgId4]);
      setTimeout(() => {
        adminCommand.bind(this)(ctx);
      }, 1500);
    }
  });
};