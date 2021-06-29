import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { addContentService } from './addContent.service.js';
import { mainAddContentKeyboard } from './addContent.keyboard.js';

export const addContentQuery = async function(ctx) {
  const initCtx = ctx;
  const { id } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);
  const categoryTitle = ctx.message.text;
  let msgId1 = (await this.sendMessage(id, categoryTitle, mainAddContentKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
  let msgId2 = (await this.sendMessage(id, 'Введите описание контента 👇')).message_id;
  setCacheMessageIdsHelper(id, [msgId2]);
  this.once('message', async (ctx) => {
    let msgId3 = ctx.message_id;
    setCacheMessageIdsHelper(id, [msgId3]);
    const description = ctx.text;
    let msgId4 = (await this.sendMessage(id, 'Добавьте контент(видео, фото, аудио, документ) 👇')).message_id;
    setCacheMessageIdsHelper(id, [msgId4]);
    this.once('document', async (ctx) => {
      let msgId5 = ctx.message_id;
      setCacheMessageIdsHelper(id, [msgId5]);
      const data = ctx.document.file_id;
      await addContentService.create({ categoryTitle, description, data, format: 'document' });
      let msgId6 = (await this.sendMessage(id, 'Готово')).message_id;
      setCacheMessageIdsHelper(id, [msgId6]);
      setTimeout(() => { addContentQuery.bind(this)(initCtx) }, 1500);
    });
    this.once('photo', async (ctx) => {
      let msgId7 = ctx.message_id;
      setCacheMessageIdsHelper(id, [msgId7]);
      const data = ctx.photo[0].file_id;
      await addContentService.create({ categoryTitle, description, data, format: 'photo' });
      setTimeout(() => { addContentQuery.bind(this)(initCtx) }, 1500);
    });
    this.once('audio', async (ctx) => {
      let msgId7 = ctx.message_id;
      setCacheMessageIdsHelper(id, [msgId7]);
      const data = ctx.audio.file_id;
      await addContentService.create({ categoryTitle, description, data, format: 'audio' });
      let msgId8 = (await this.sendMessage(id, 'Готово')).message_id;
      setCacheMessageIdsHelper(id, [msgId8]);
      setTimeout(() => { addContentQuery.bind(this)(initCtx) }, 1500);
    });
    this.once('video', async (ctx) => {
      let msgId9 = ctx.message_id;
      setCacheMessageIdsHelper(id, [msgId9]);      
      const data = ctx.video.file_id;
      await addContentService.create({ categoryTitle, description, data, format: 'video' });
      let msgId10 = (await this.sendMessage(id, 'Готово')).message_id;
      setCacheMessageIdsHelper(id, [msgId10]);
      setTimeout(() => { addContentQuery.bind(this)(initCtx) }, 1500);
    });
    this.once('text', async (ctx) => {
      let msgId11 = ctx.message_id;
      setCacheMessageIdsHelper(id, [msgId11]);
      const data = ctx.text;
      await addContentService.create({ categoryTitle, description, data, format: 'text' });
      let msgId12 = (await this.sendMessage(id, 'Готово')).message_id;
      setCacheMessageIdsHelper(id, [msgId12]);
      setTimeout(() => { addContentQuery.bind(this)(initCtx) }, 1500);
    });
  });
};