import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { mainDeleteCategoryKeyboard, confirmDeleteCategoryKeyboard } from './deleteCategory.keyboard.js';
import { deleteCategoryService } from './deleteCategory.service.js';
import { CONFIRM } from './deleteCategory.constant.js';

export const deleteCategoryQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);

  let msgId1 = (await this.sendMessage(id, 'Удаление. Введите название категории 👇', mainDeleteCategoryKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
  this.once('message', async (ctx) => {
    const categoryTitle = ctx.text;
    let msgId2 = ctx.message_id;
    setCacheMessageIdsHelper(id, [msgId2]);
    if (await deleteCategoryService.isCategoryExist(categoryTitle)) {
      let msgId3 = (await this.sendMessage(id, 'Вы уверенны, что хотите удалить данную категорию❓', confirmDeleteCategoryKeyboard)).message_id;
      setCacheMessageIdsHelper(id, [msgId3]);
      this.once('callback_query', async (ctx) => {
        switch (ctx.data) {
          case CONFIRM.YES:
            await deleteCategoryService.deleteByTitle(categoryTitle);
            let msgId4 = (await this.sendMessage(id, 'Категория успешно удалена 🗑')).message_id;
            setCacheMessageIdsHelper(id, [msgId4]);
            break;
          case CONFIRM.NO:
            let msgId5 = (await this.sendMessage(id, 'Удаление отменено')).message_id;
            setCacheMessageIdsHelper(id, [msgId5]);
            break;
          default: break;
        }
        setTimeout(() => {
          deleteCategoryQuery.bind(this)(ctx);
        }, 1500);
      });
  } else {
    let msgId6 = (await this.sendMessage(id, 'Кажется указанной категории несуществует, проверьте правильность написания.')).message_id;
    setCacheMessageIdsHelper(id, [msgId6]);
    setTimeout(() => {
      deleteCategoryQuery.bind(this)(ctx);
    }, 1500);
  }
  });
};