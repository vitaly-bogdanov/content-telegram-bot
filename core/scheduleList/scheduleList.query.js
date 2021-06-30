import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper, setCacheDataHelper } from '../../lib/cache/index.js';
import { scheduleListService } from './scheduleList.service.js';
import { mainScheduleListKeyboard, dayConfigScheduleListKeyboard } from './scheduleList.keyboard.js';

export const scheduleListQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);
  const username = ctx.message.text;
  const schedules = await scheduleListService.getSchedulesByUsername(username);
  let msgIds = [];
  for (let schedule of schedules) {
    let msgId = (await this.sendMessage(id, schedule.dayName, dayConfigScheduleListKeyboard)).message_id;
    msgIds.push(msgId);
  }
  setCacheMessageIdsHelper(id, msgIds);
  const managerTelegramId = await scheduleListService.getManagerTelegramIdByUsername(username);
  setCacheDataHelper(id,  { managerTelegramId });
  const text = `ID менеджера: ${managerTelegramId}\nВыберите день недели, который\nхотите настроить`;
  let msgId2 = (await this.sendMessage(id, text, mainScheduleListKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId2]);
}