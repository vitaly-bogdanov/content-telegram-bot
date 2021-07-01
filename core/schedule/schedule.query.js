import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper, setCacheDataHelper, getCacheDataHelper } from '../../lib/cache/index.js';
import { scheduleService } from './schedule.service.js';
import { scheduleKeyboard } from './schedule.keyboard.js';

export const scheduleQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  const { scheduleId, dayName } = ctx.queryData;
  await clearMessageAndOnceEventsHepler(this, id);
  const times = await scheduleService.getTimesByScheduleId(scheduleId);
  let timesText = times.reduce((akk, time, index) => `${akk}\n${index + 1})${time.value}`, 'Время отсылок:');
  let categoryNames = times.reduce((akk, time, index) => `${akk}\n${index + 1})${time.categoryId ? time.category.title : 'Категория не назначенна'}`, 'Категории отсылок:');
  let text = `${dayName}\n\n${timesText}\n\n${categoryNames}`;
  let msgId1 = (await this.sendMessage(id, text,  scheduleKeyboard(scheduleId, dayName))).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
}