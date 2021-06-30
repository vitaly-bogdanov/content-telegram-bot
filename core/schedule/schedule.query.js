import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper, setCacheDataHelper, getCacheDataHelper } from '../../lib/cache/index.js';

export const scheduleQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);

  const managerTelegramId = getCacheDataHelper(id).managerTelegramId;
  const dayName = ctx.message.text;

  console.log(managerTelegramId);
  console.log(dayName);
}