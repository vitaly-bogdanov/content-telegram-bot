import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { addCategoryService } from './addCategory.service.js';
import { mainAddCategoryKeyboard } from './addCategory.keyboard.js';

export const addCategoryQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);

  console.log('hello9999');

  let msgId1 = (await this.sendMessage(id, 'Добавление. Введите название категории 👇', mainAddCategoryKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
  this.once('message', async (ctx) => {
    const categoryTitle = ctx.text;
    let msgId2 = ctx.message_id;
    await addCategoryService.create(categoryTitle);
    let msgId3 = (await this.sendMessage(id, 'Категория успешно добавдена 👍')).message_id;
    setCacheMessageIdsHelper(id, [msgId2, msgId3]);
    setTimeout(() => {
      addCategoryQuery.bind(this)(ctx);
    }, 1500);
  });
};