import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';

export const editContentQuery = function(ctx) {
  const { id } = getUserHelper(ctx);
  console.log(ctx);

};