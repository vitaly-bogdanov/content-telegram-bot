import { getUserHelper } from '../../lib/telegram/index.js';
import { adminService } from './admin.service.js';
import { mainAdminKeyboard } from './admin.keyboard.js';
import { setCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../../lib/cache/index.js'

export const adminCommand = async function(ctx) {
  const { id, first_name, last_name, username } = getUserHelper(ctx);

  clearCacheMessageIdsHelper(id);

  let messageIds = [];
  const isRegistered = await adminService.isRegistered(id); 
  if (!isRegistered) await adminService.registration({ id, first_name, last_name, username });
  let text = `Добро пожаловать!\nваш ID: ${id}`;
  messageIds.push((await this.sendMessage(id, text)).message_id);
  this.once('message', async (ctx) => {
    const password = ctx.text;
    let admin = await adminService.login(id, password);
    if (admin) {
      messageIds.push(await this.sendMessage(id, 'Главное меню', mainAdminKeyboard));
    } else {
      adminCommand.bind(this)(ctx);
    }
  });

  setCacheMessageIdsHelper(messageIds); 
};