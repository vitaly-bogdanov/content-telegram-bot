import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';

export const scheduleListQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);

  const username = ctx.message.text;
}