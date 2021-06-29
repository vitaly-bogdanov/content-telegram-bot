import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';

export const addContentQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);
  const categoryTitle = ctx.message.text;
  
  let msgId1 = (await this.sendMessage(id, 'Добавить контент 👇')).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);

  let msgId2 = (await this.sendMessage(id, 'Введите описание контента 👇')).message_id;
  setCacheMessageIdsHelper(id, [msgId2]);

  this.once('message', async (ctx) => {
    const descriptionContent = ctx.text;
    let msgId3 = (await this.sendMessage(id, 'Добавьте контент(видео, фото, аудио, документ) 👇')).message_id;
    setCacheMessageIdsHelper(id, [msgId3]);
    this.once('document', async (ctx) => {
      console.log('document');
      console.log(ctx);
    });
    this.once('photo', async (ctx) => {
      console.log('photo');
      console.log(ctx);
    });
    this.once('audio', async (ctx) => {
      console.log('audio');
      console.log(ctx);
    });
    this.once('video', async (ctx) => {
      console.log('video');
      console.log(ctx);
    });
  });
};