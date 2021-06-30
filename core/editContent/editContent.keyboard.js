import { EDIT_CONTENT_QUERY_TYPE } from './editContent.constant.js';
import { CONTENT_ACTION_NAME } from '../content/index.js';

export const mainEditContentKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Изменить описание', callback_data: EDIT_CONTENT_QUERY_TYPE.DESCRIPTION },
        { text: 'Изменить контент', callback_data: EDIT_CONTENT_QUERY_TYPE.CONTENT }
      ],
      [
        { text: 'Назад 🔙', callback_data: 'content' }
      ]
    ]
  }
};