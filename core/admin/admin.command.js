import { getUserHelper } from '../../lib/telegram/index.js';
import { adminService } from './admin.service.js';

export const adminCommand = async function(ctx) {
  const { 
    id, first_name,
    last_name,
    username
  } = getUserHelper(ctx);
  let messageIds = [];

  let text = `Добро пожаловать!\nваш ID: ${id}`;

  messageIds.push((await this.sendMessage(id, text)).message_id);

  this.once('message', async (ctx) => {
    const password = ctx.text;
    let authStatus = await adminService.auth(id, password);
    if (authStatus) {
      await this.sendMessage(id, 'hello');
    } else {
      adminCommand.bind(this)(ctx);
    }
  });
};