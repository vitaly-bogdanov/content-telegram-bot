import { getUserHelper } from '../../lib/telegram/index.js';
import { adminService } from './admin.service.js';

export const adminCommand = async function(ctx) {
  let messageIds = [];
  const { id, first_name, last_name, username } = getUserHelper(ctx);
  const isRegistered = await adminService.isRegistered(id);
  if (!isRegistered) await adminService.registration({ id, first_name, last_name, username });
  let text = `Добро пожаловать!\nваш ID: ${id}`;
  messageIds.push((await this.sendMessage(id, text)).message_id);
  this.once('message', async (ctx) => {
    const password = ctx.text;
    let admin = await adminService.login(id, password);
    if (admin) {
      console.log(admin);
      await this.sendMessage(id, 'hello');
    } else {
      adminCommand.bind(this)(ctx);
    }
  });
};