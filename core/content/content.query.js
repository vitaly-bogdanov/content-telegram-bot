import { contentService } from './content.service.js';
import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { mainContentKeyboard, contentEditKeyboard } from './contnet.keyboard.js';

export const contentQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  const categoryTitle = ctx.message.text;
  await clearMessageAndOnceEventsHepler(this, id);
  const contents = await contentService.getContentByCategoryTitle(categoryTitle);

  let msgIds = [];
  for (let content of contents) {
    let msgId = (await this.sendMessage(id, content.description, contentEditKeyboard)).message_id;
    msgIds.push(msgId);
  }
  setCacheMessageIdsHelper(id, msgIds);

  let msgId1 = (await this.sendMessage(id, `Контент категории: ${categoryTitle}`, mainContentKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};