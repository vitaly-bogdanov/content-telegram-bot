import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { mainEditContentKeyboard } from './editContent.keyboard.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { EDIT_CONTENT_QUERY_TYPE } from './editContent.constant.js';

export const editContentQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  const contentDescription = ctx.message.text;
  await clearMessageAndOnceEventsHepler(this, id);

  const categoryName = 'dvfd';

  let msgId1 = (await this.sendMessage(id, contentDescription, mainEditContentKeyboard(categoryName))).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);

  this.once('callback_query', async (ctx) => {
    const queryType = ctx.data;
    switch (queryType) {
      case EDIT_CONTENT_QUERY_TYPE.DESCRIPTION:
        let msgId2 = (await this.sendMessage(id, 'Введите новое описание:')).message_id;
        setCacheMessageIdsHelper(id, [msgId2]);
        this.once('message', async (ctx) => {
          const newDescription = ctx.text;

          console.log(EDIT_CONTENT_QUERY_TYPE.DESCRIPTION);
          console.log(ctx);
        });
        break;
      case EDIT_CONTENT_QUERY_TYPE.CONTENT:
        let msgId3 = (await this.sendMessage(id, 'Добавьте новый контент(видео, фото, аудио, документ):')).message_id;
        setCacheMessageIdsHelper(id, [msgId3]);
        console.log('должно работать');
        this.once('document', async (ctx) => {
          let msgId4 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId4]);

          console.log('document');
          console.log(ctx);
        });
        this.once('photo', async (ctx) => {
          let msgId5 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId5]);

          console.log('photo');
          console.log(ctx);
        });
        this.once('audio', async (ctx) => {
          let msgId6 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId6]);

          console.log('audio');
          console.log(ctx);
        });
        this.once('video', async (ctx) => {
          let msgId7 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId7]);

          console.log('video');
          console.log(ctx);
        });
        break;
    }
    // setTimeout(() => {

    // }, 1500)
  });
};