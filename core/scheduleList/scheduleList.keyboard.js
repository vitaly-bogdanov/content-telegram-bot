import { MAILING_ACTION_NAME } from '../mailing/index.js';

export const mainScheduleListKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Назад', callback_data: MAILING_ACTION_NAME }
      ]
    ]
  }
};