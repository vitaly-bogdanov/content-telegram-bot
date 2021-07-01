import { clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';

export const changeCategoryQuery = async function(ctx) {
  let id = ctx.from.id;
  await clearMessageAndOnceEventsHepler(this, id);
  
  console.log(ctx);
};