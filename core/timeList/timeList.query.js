import { timeListService } from './timeList.service.js';
import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { timeKeyboard } from './timeList.keyboard.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';

export const timeListQuery = async function(ctx) {
  const { scheduleId, dayName } = ctx.queryData;
  const { id } = getUserHelper(ctx);
  const times = await timeListService.getTimesByScheduleId(scheduleId);
  await clearMessageAndOnceEventsHepler(this, id);
  const text = `Выберите время, которое\nхотите изменить 👇`;
  let msgId1 = (await this.sendMessage(id, text, timeKeyboard(times, scheduleId, dayName))).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
};