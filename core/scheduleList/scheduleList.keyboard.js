import { MAILING_ACTION_NAME } from '../mailing/index.js';
import { SCHEDULE_ACTION_NAME } from '../schedule/index.js';

export const mainScheduleListKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Назад', callback_data: MAILING_ACTION_NAME }
      ]
    ]
  }
};

export const dayConfigScheduleListKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Настроить', callback_data: SCHEDULE_ACTION_NAME }
      ]
    ]
  }
};
