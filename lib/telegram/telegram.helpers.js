import { getCacheMessageIdsHelper, clearCacheMessageIdsHelper } from '../cache/index.js';

// {
//   message_id: 2049,
//   from: {
//     id: 357594609,
//     is_bot: false,
//     first_name: 'Vitaliy',
//     last_name: 'Bogdanov',
//     username: 'kaliummati',
//     language_code: 'ru'
//   },
//   chat: {
//     id: 357594609,
//     first_name: 'Vitaliy',
//     last_name: 'Bogdanov',
//     username: 'kaliummati',
//     type: 'private'
//   },
//   date: 1624965227,
//   text: '/start',
//   entities: [ { offset: 0, length: 6, type: 'bot_command' } ]
// }

// {
//   message_id: 2062,
//   from: {
//     id: 357594609,
//     is_bot: false,
//     first_name: 'Vitaliy',
//     last_name: 'Bogdanov',
//     username: 'kaliummati',
//     language_code: 'ru'
//   },
//   chat: {
//     id: 357594609,
//     first_name: 'Vitaliy',
//     last_name: 'Bogdanov',
//     username: 'kaliummati',
//     type: 'private'
//   },
//   date: 1624965339,
//   photo: [
//     {
//       file_id: 'AgACAgIAAxkBAAIIDmDbAAHb4qRk4JoKE9inRb9tQE96RgACBbMxG5M_2UppzDzLSXXqGQEAAwIAA3MAAyAE',
//       file_unique_id: 'AQADBbMxG5M_2Up4',
//       file_size: 934,
//       width: 90,
//       height: 60
//     },
//     {
//       file_id: 'AgACAgIAAxkBAAIIDmDbAAHb4qRk4JoKE9inRb9tQE96RgACBbMxG5M_2UppzDzLSXXqGQEAAwIAA20AAyAE',
//       file_unique_id: 'AQADBbMxG5M_2Upy',
//       file_size: 8684,
//       width: 320,
//       height: 213
//     },
//     {
//       file_id: 'AgACAgIAAxkBAAIIDmDbAAHb4qRk4JoKE9inRb9tQE96RgACBbMxG5M_2UppzDzLSXXqGQEAAwIAA3gAAyAE',
//       file_unique_id: 'AQADBbMxG5M_2Up9',
//       file_size: 25003,
//       width: 640,
//       height: 427
//     }
//   ],
//   caption: 'edwe'
// }

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
  const cacheMessageIds = getCacheMessageIdsHelper(id);
  await deleteMessagesHelper(bot, id, cacheMessageIds);
  clearCacheMessageIdsHelper(id);
};