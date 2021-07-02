import { getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../cache/index.js';

export const getActionNameHelper = ctx => {  
  if ('data' in ctx) {
    return ctx.data;
  } else if ('text' in ctx) {
    return ctx.text[0] === '/' ? ctx.text.substr(1) : ctx.text;
  }
  return null;
};
export const getUserHelper = ctx => ctx.from;
export const deleteMessagesHelper = async (bot, chatId, messageIds) => {
  for await (let messageId of messageIds) {
    await bot.deleteMessage(chatId, messageId);
  };
};

export const clearMessageAndOnceEventsHepler = async (bot, id) => {
  if (bot._events.message.length) bot._events.message = bot._events.message.filter((ee) => !ee.once);
  if (bot._events.callback_query.length) bot._events.callback_query = bot._events.callback_query.filter((ee) => !ee.once);

  if (bot._events.document) delete bot._events.document;
  if (bot._events.photo) delete bot._events.photo;
  if (bot._events.audio) delete bot._events.audio;
  if (bot._events.video) delete bot._events.video;
  if (bot._events.text) delete bot._events.text;

  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(bot, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);
};

export const getActionQueryNameAndData = (ctx) => {
  if (ctx.data.indexOf('?') === -1) {
    return { actionName: ctx.data, queryData: {}};
  } else {
    let actionName = ctx.data.split('?')[0];
    let queryData = ctx.data.split('?')[1].split('&').reduce((akk, queryString) => { 
      let values = queryString.split('=');
      akk[values[0]] = values[1];
      return akk;
    }, {});
    return { actionName, queryData };
  }
};