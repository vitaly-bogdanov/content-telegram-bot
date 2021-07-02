import { clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { selectCategoryService } from './selectCategory.service.js';
import { selectCategoryKeyboard } from './selectCategory.keyboard.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';

export const selectCategoryQuery = async function(ctx) {
  let id = ctx.from.id;
  const { scheduleId, managerId } = ctx.queryData;
  await clearMessageAndOnceEventsHepler(this, id);
  const times = await selectCategoryService.getTimesWhitCategoryByScheduleId(scheduleId);
  let text = 'Выберете категорию, которую хотите изменить 👇';
  let msgId1 = (await this.sendMessage(id, text, selectCategoryKeyboard(times, scheduleId, managerId))).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};