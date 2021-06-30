import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { scheduleListService } from './scheduleList.service.js';
import { mainScheduleListKeyboard } from './scheduleList.keyboard.js';

export const scheduleListQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);
  const text = `ID менеджера: ${id}\nВыберите день недели, который\nхотите настроить`;
  let msgId1 = (await this.sendMessage(id, text)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
  const username = ctx.message.text;
  const schedules = await scheduleListService.getSchedulesByUsername(username);
  let msgIds = [];
  for (let schedule of schedules) {
    let msgId = (await this.sendMessage(id, schedule.dayName)).message_id;
    msgIds.push(msgId);
  }
  setCacheMessageIdsHelper(id, msgIds);

  let msgId2 = (await this.sendMessage(id, 'dwewdd', mainScheduleListKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);

  // msd description
  // msg username, btns
}