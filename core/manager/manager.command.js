import { getUserHelper } from '../../lib/telegram/telegram.helpers.js'

export const managerCommand = async function(ctx) {
  const messageIds = [];
  const chatId = getUserHelper(ctx);

  messageIds.push((await this.sendMessage(chatId, 'kkkkk')).message_id);
};