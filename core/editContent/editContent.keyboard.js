import { EDIT_CONTENT_QUERY_TYPE } from './editContent.constant.js';

export const mainEditContentKeyboard = (categoryName) => ({
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Изменить описание', callback_data: EDIT_CONTENT_QUERY_TYPE.DESCRIPTION },
        { text: 'Изменить контент', callback_data: EDIT_CONTENT_QUERY_TYPE.CONTENT }
      ],
      [
        { text: 'Назад 🔙', callback_data: categoryName }
      ]
    ]
  }
})