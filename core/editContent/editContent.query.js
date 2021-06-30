import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { mainEditContentKeyboard } from './editContent.keyboard.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { EDIT_CONTENT_QUERY_TYPE } from './editContent.constant.js';
import { editContentService } from './editContent.service.js';

export const editContentQuery = async function(ctx) {
  const { id } = getUserHelper(ctx);
  let initCtx = ctx;
  const contentDescription = ctx.message.text;
  await clearMessageAndOnceEventsHepler(this, id);
  const categoryTitle = await editContentService.getCategoryTitleByContentDescription(contentDescription);
  let msgId0 = (await this.sendMessage(id, `Описание: ${contentDescription}`)).message_id;
  let msgId1 = (await this.sendMessage(id, categoryTitle, mainEditContentKeyboard)).message_id;
  setCacheMessageIdsHelper(id, [msgId0, msgId1]);
  this.once('callback_query', async (ctx) => {
    const queryType = ctx.data;
    switch (queryType) {
      case EDIT_CONTENT_QUERY_TYPE.DESCRIPTION:
        let msgId2 = (await this.sendMessage(id, 'Введите новое описание:')).message_id;
        setCacheMessageIdsHelper(id, [msgId2]);
        this.once('message', async (ctx) => {
          let msgId3 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId3]);
          const newDescription = ctx.text;
          let content = await editContentService.addNewDescription({ oldDescription: contentDescription, newDescription });
          let msgId4 = (await this.sendMessage(id, 'Готово')).message_id;
          setCacheMessageIdsHelper(id, [msgId4]);
          initCtx.message.text = content.description;
          setTimeout(() => { editContentQuery.bind(this)(initCtx) }, 1500);
        });
        break;
      case EDIT_CONTENT_QUERY_TYPE.CONTENT:
        let msgId5 = (await this.sendMessage(id, 'Добавьте новый контент(видео, фото, аудио, документ):')).message_id;
        setCacheMessageIdsHelper(id, [msgId5]);
        this.once('document', async (ctx) => {
          let msgId6 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId6]);
          const data = ctx.document.file_id;
          await editContentService.addNewContent({ description: contentDescription, data, format: 'document' });
          let msgId7 = (await this.sendMessage(id, 'Готово')).message_id;
          setCacheMessageIdsHelper(id, [msgId7]);
          setTimeout(() => { editContentQuery.bind(this)(initCtx) }, 1500);
        });
        this.once('photo', async (ctx) => {
          let msgId8 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId8]);
          const data = ctx.photo[0].file_id;
          await editContentService.addNewContent({ description: contentDescription, data, format: 'photo' });
          let msgId9 = (await this.sendMessage(id, 'Готово')).message_id;
          setCacheMessageIdsHelper(id, [msgId9]);
          setTimeout(() => { editContentQuery.bind(this)(initCtx) }, 1500);
        });
        this.once('audio', async (ctx) => {
          let msgId10 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId10]);
          const data = ctx.audio.file_id;
          await editContentService.addNewContent({ description: contentDescription, data, format: 'audio' });
          let msgId11 = (await this.sendMessage(id, 'Готово')).message_id;
          setCacheMessageIdsHelper(id, [msgId11]);
          setTimeout(() => { editContentQuery.bind(this)(initCtx) }, 1500);
        });
        this.once('video', async (ctx) => {
          let msgId12 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId12]);
          const data = ctx.video.file_id;
          await editContentService.addNewContent({ description: contentDescription, data, format: 'video' });
          let msgId13 = (await this.sendMessage(id, 'Готово')).message_id;
          setCacheMessageIdsHelper(id, [msgId13]);
          setTimeout(() => { editContentQuery.bind(this)(initCtx) }, 1500);
        });
        this.once('text', async (ctx) => {
          let msgId14 = ctx.message_id;
          setCacheMessageIdsHelper(id, [msgId14]);
          const data = ctx.text;
          await addContentService.create({ categoryTitle, description, data, format: 'text' });
          let msgId15 = (await this.sendMessage(id, 'Готово')).message_id;
          setCacheMessageIdsHelper(id, [msgId15]);
          setTimeout(() => {editContentQuery.bind(this)(initCtx) }, 1500);
        });
        break;
    }
  });
};