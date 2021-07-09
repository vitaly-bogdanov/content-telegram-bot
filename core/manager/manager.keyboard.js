import { ACTION } from './manager.constant.js';

export const managerKeyboard = (menagerId, contentId) => ({
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Заменить', callback_data: `${ACTION.SET_CONTENT}?menagerId=${menagerId}&contentId=${contentId}` }
      ]
    ]
  }
});