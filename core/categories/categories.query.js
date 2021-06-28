import { getUserHelper, deleteMessagesHelper } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper, getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { mainCategoriesKeyboard, categoryConfigKeyboard } from './categories.keyboard.js';
import { categoriesService } from './categories.service.js';

const categoriesQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);

  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(this, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);

  // const categories = await categoriesService.getCategories();
  // let msgIds = [];
  // for (let category of categories) {
  //   let msgId = (await this.sendMessage(id, category.title, categoryConfigKeyboard(category.slug))).message_id;
  //   msgIds.push(msgId);
  // }
  // setCacheMessageIdsHelper(id, msgIds);

  let msgId1 = (await this.sendMessage(id, 'Категории', mainCategoriesKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};