import { getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../cache/index.js';

export const getActionNameHelper = ctx => { 
  if (ctx.data) {
    return ctx.data;
  } else {
    return ctx.text[0] === '/' ? ctx.text.substr(1) : ctx.text;
  }
}
export const getUserHelper = ctx => ctx.from;
export const deleteMessagesHelper = async (bot, chatId, messageIds) => {
  for await (let messageId of messageIds) {
    await bot.deleteMessage(chatId, messageId);
  };
};

export const clearMessageAndOnceEventsHepler = async (bot, id) => {
  if (bot._events.message.length) bot._events.message = bot._events.message.filter((ee) => !ee.once);
  if (bot._events.callback_query.length) bot._events.callback_query = bot._events.callback_query.filter((ee) => !ee.once);
  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(bot, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);
};