import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { mainCategoriesKeyboard, categoryConfigKeyboard } from './categories.keyboard.js';
import { categoriesService } from './categories.service.js';

export const categoriesQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);

  const categories = await categoriesService.getCategories();
  let msgIds = [];
  for (let category of categories) {
    let msgId = (await this.sendMessage(id, category.title, categoryConfigKeyboard(category.slug))).message_id;
    msgIds.push(msgId);
  }
  setCacheMessageIdsHelper(id, msgIds);

  let msgId1 = (await this.sendMessage(id, 'Категории', mainCategoriesKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};