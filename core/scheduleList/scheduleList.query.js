import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper, setCacheDataHelper } from '../../lib/cache/index.js';
import { scheduleListService } from './scheduleList.service.js';
import { scheduleListKeyboard } from './scheduleList.keyboard.js';

export const scheduleListQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  const { managerId, telegramId } = ctx.queryData;
  await clearMessageAndOnceEventsHepler(this, id);
  const schedules = await scheduleListService.getScheduleByManagerId(managerId);
  const text = `ID менеджера: ${telegramId}\nВыберите день недели, который хотите настроить`;
  let msgId1 = (await this.sendMessage(id, text, scheduleListKeyboard(schedules, managerId, telegramId))).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};