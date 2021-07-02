import { contentService } from './content.service.js';
import { getUserHelper, clearMessageAndOnceEventsHepler, getActionQueryNameAndData } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { mainContentKeyboard, contentEditKeyboard } from './contnet.keyboard.js';
import { ACTION } from './content.constant.js';


export const contentQuery = async function(ctx) {
  const initCtx = ctx;
  const { id } = getUserHelper(ctx);
  const categoryTitle = ctx.message.text;
  await clearMessageAndOnceEventsHepler(this, id);
  const contents = await contentService.getContentByCategoryTitle(categoryTitle);
  let msgIds = [];
  for (let content of contents) {
    let msgDescriptionId = (await this.sendMessage(id, content.description, contentEditKeyboard(content.id))).message_id;
    msgIds.push(msgDescriptionId);
  }
  setCacheMessageIdsHelper(id, msgIds);
  this.once('callback_query', async (ctx) => {
    const { actionName, queryData } = getActionQueryNameAndData(ctx);
    if (ACTION.CHANGE === actionName) {
      const contentId = queryData.contentId;
      await contentService.deleteContentById(contentId);
      setTimeout(() => { contentQuery.bind(this)(initCtx) }, 1500);
    }
  });
  let msgId1 = (await this.sendMessage(id, categoryTitle, mainContentKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};