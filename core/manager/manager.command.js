import { getUserHelper } from '../../lib/telegram/telegram.helpers.js'
import { managerService } from './manager.service.js';

export const managerCommand = async function(ctx) {
  const { id, first_name, last_name, username } = getUserHelper(ctx);
  const isRegistered = await managerService.isRegistered(id);
  if (!isRegistered) await managerService.registration({ id, first_name, last_name, username });
  const text = `Добро пожаловать!\nваш ID: ${id}`;
  let msgId1 = (await this.sendMessage(id, text)).message_id;
};