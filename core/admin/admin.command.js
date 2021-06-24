import { getUserHelper } from '../../lib/telegram/index.js';

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
    // пароль

    
  });
};