import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { mainEditContentKeyboard } from './editContent.keyboard.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { EDIT_CONTENT_QUERY_TYPE } from './editContent.constant.js';
import { editContentService } from './editContent.service.js';

export const editContentQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  const initCtx = ctx;
  const contentDescription = ctx.message.text;
  await clearMessageAndOnceEventsHepler(this, id);

  // const categoryTitle = editContentService

  let msgId1 = (await this.sendMessage(id, contentDescription, mainEditContentKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);

  this.once('callback_query', async (ctx) => {
    const queryType = ctx.data;
    switch (queryType) {
      case EDIT_CONTENT_QUERY_TYPE.DESCRIPTION:
        let msgId2 = (await this.sendMessage(id, 'Введите новое описание:')).message_id;
        setCacheMessageIdsHelper(id, [msgId2]);
        this.once('message', async (ctx) => {
          const newDescription = ctx.text;
          await editContentService.addNewDescription({ oldDescription: contentDescription, newDescription });
          let msgId3 = (await this.sendMessage(id, 'Готово')).message_id;
          setCacheMessageIdsHelper(id, [msgId3]);
          setTimeout(() => { editContentQuery.bind(this)(initCtx) }, 1500);
        });
        break;
      case EDIT_CONTENT_QUERY_TYPE.CONTENT:
        let msgId4 = (await this.sendMessage(id, 'Добавьте новый контент(видео, фото, аудио, документ):')).message_id;
        setCacheMessageIdsHelper(id, [msgId4]);
        console.log('должно работать');
        this.once('document', async (ctx) => {
          let msgId5 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId5]);
          const data = ctx.document.file_id;
          await editContentService.addNewContent({ description: contentDescription, data, format: 'document' });
          let msgId6 = (await this.sendMessage(id, 'Готово')).message_id;
          setCacheMessageIdsHelper(id, [msgId6]);
          setTimeout(() => { editContentQuery.bind(this)(initCtx) }, 1500);
        });
        this.once('photo', async (ctx) => {
          let msgId7 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId7]);
          const data = ctx.photo[0].file_id;
          await editContentService.addNewContent({ description: contentDescription, data, format: 'photo' });
          let msgId8 = (await this.sendMessage(id, 'Готово')).message_id;
          setCacheMessageIdsHelper(id, [msgId8]);
          setTimeout(() => { editContentQuery.bind(this)(initCtx) }, 1500);
        });
        this.once('audio', async (ctx) => {
          let msgId9 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId9]);
          const data = ctx.audio.file_id;
          await editContentService.addNewContent({ description: contentDescription, data, format: 'audio' });
          let msgId10 = (await this.sendMessage(id, 'Готово')).message_id;
          setCacheMessageIdsHelper(id, [msgId10]);
          setTimeout(() => { editContentQuery.bind(this)(initCtx) }, 1500);
        });
        this.once('video', async (ctx) => {
          let msgId11 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId11]);
          const data = ctx.video.file_id;
          await editContentService.addNewContent({ description: contentDescription, data, format: 'video' });
          let msgId12 = (await this.sendMessage(id, 'Готово')).message_id;
          setCacheMessageIdsHelper(id, [msgId12]);
          setTimeout(() => { editContentQuery.bind(this)(initCtx) }, 1500);
        });

        this.once('text', async (ctx) => {
          let msgId13 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId13]);
          const data = ctx.text;
          await addContentService.create({ categoryTitle, description, data, format: 'text' });
          let msgId14 = (await this.sendMessage(id, 'Готово')).message_id;
          setCacheMessageIdsHelper(id, [msgId14]);
          setTimeout(() => {editContentQuery.bind(this)(initCtx) }, 1500);
        });
        break;
    }
  });
};