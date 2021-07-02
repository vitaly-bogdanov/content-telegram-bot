import { clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { changeCategoryService } from './changeСategory.service.js';
import { changeCategoryKeyboard } from './changeСategory.keyboard.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { getActionQueryNameAndData } from '../../lib/telegram/index.js';
import { ACTION } from './changeСategory.constant.js';
import { scheduleQuery } from '../schedule/index.js';

export const changeCategoryQuery = async function(ctx) {
  let initCtx = ctx;
  let id = ctx.from.id;
  const { scheduleId, timeId, managerId } = ctx.queryData;
  await clearMessageAndOnceEventsHepler(this, id);
  const categories = await changeCategoryService.filteredCategory(scheduleId);
  const text = 'Выберите категорию, на которую хотите поменять текущую';
  let msgId1 = (await this.sendMessage(id, text, changeCategoryKeyboard(categories, scheduleId, managerId))).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
  this.once('callback_query', async (ctx) => {
    const { actionName, queryData } = getActionQueryNameAndData(ctx);
    if (ACTION.CHANGE === actionName) {
      const newCategoryId = queryData.categorId;
      await changeCategoryService.updateTimeCategory(timeId, newCategoryId);
      let msgId2 = (await this.sendMessage(id, 'Готово категория изменена')).message_id;
      setCacheMessageIdsHelper(id, [msgId2]);
      setTimeout(() => { scheduleQuery.bind(this)(initCtx) }, 1500);
    }
  });
};