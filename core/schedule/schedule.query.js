import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper, setCacheDataHelper, getCacheDataHelper } from '../../lib/cache/index.js';
import { scheduleService } from './schedule.service.js';

export const scheduleQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);
  const managerTelegramId = getCacheDataHelper(id).managerTelegramId;
  const dayName = ctx.message.text;
  const scheduleId = await scheduleService.getSheduleId(managerTelegramId, dayName);
  setCacheDataHelper(id, { scheduleId });
  const times = await scheduleService.getTimesByManagerTelegramIdAndDayName(managerTelegramId, dayName);

  let timesText = times.reduce((akk, time, index) => `${akk}${time.}`, 'Время отсылок:\n');

  let msgId1 = (await this.sendMessage(id, dayName)).message_id;

}