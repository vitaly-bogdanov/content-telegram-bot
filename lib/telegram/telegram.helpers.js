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

// {
//   id: '1535857153542000100',
//   from: {
//     id: 357594609,
//     is_bot: false,
//     first_name: 'Vitaliy',
//     last_name: 'Bogdanov',
//     username: 'kaliummati',
//     language_code: 'ru'
//   },
//   message: {
//     message_id: 579,
//     from: {
//       id: 1812873146,
//       is_bot: true,
//       first_name: 'mniam_mniam_admin',
//       username: 'mniam_mniam_admin_bot'
//     },
//     chat: {
//       id: 357594609,
//       first_name: 'Vitaliy',
//       last_name: 'Bogdanov',
//       username: 'kaliummati',
//       type: 'private'
//     },
//     date: 1624610909,
//     text: 'Главное меню',
//     reply_markup: { inline_keyboard: [Array] }
//   },
//   chat_instance: '4161136107038922416',
//   data: 'mailing'
// }