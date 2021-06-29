import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';

export const addContentQuery = async function(ctx) {
  const initCtx = ctx;
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);
  const categoryTitle = ctx.message.text;
  
  let msgId1 = (await this.sendMessage(id, 'Добавить контент 👇')).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);

  let msgId2 = (await this.sendMessage(id, 'Введите описание контента 👇')).message_id;
  setCacheMessageIdsHelper(id, [msgId2]);

  this.once('message', async (ctx) => {
    let msgId3 = ctx.message_id;
    setCacheMessageIdsHelper(id, [msgId3]);

    const descriptionContent = ctx.text;
    let msgId4 = (await this.sendMessage(id, 'Добавьте контент(видео, фото, аудио, документ) 👇')).message_id;
    setCacheMessageIdsHelper(id, [msgId4]);
    this.once('text', async (ctx) => {
      let msgId9 = ctx.message_id;
      setCacheMessageIdsHelper(id, [msgId9]);

      console.log('text');
    });

    this.once('document', async (ctx) => {
      let msgId5 = ctx.message_id;
      setCacheMessageIdsHelper(id, [msgId5]);

      console.log('document');
      console.log(ctx);
      setTimeout(() => { addContentQuery.bind(this)(initCtx) }, 1500);
    });
    this.once('photo', async (ctx) => {
      let msgId6 = ctx.message_id;
      setCacheMessageIdsHelper(id, [msgId6]);

      console.log('photo');
      console.log(ctx);
      setTimeout(() => { addContentQuery.bind(this)(initCtx) }, 1500);
    });
    this.once('audio', async (ctx) => {
      let msgId7 = ctx.message_id;
      setCacheMessageIdsHelper(id, [msgId7]);

      console.log('audio');
      console.log(ctx);
      setTimeout(() => { addContentQuery.bind(this)(initCtx) }, 1500);
    });
    this.once('video', async (ctx) => {
      let msgId8 = ctx.message_id;
      setCacheMessageIdsHelper(id, [msgId8]);      

      console.log('video');
      console.log(ctx);
      setTimeout(() => { addContentQuery.bind(this)(initCtx) }, 1500);
    });
  });
};