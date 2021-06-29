import { CONTENT_ACTION_NAME } from '../content/index.js';

export const mainAddContentKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Назад 🔙', callback_data: 'content' }
      ]
    ]
  }
};