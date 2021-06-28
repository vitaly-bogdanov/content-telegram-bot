import { contentService } from './content.service.js';
import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';

export const contentQuery = async function(ctx) {
  const { id, data } = getUserHelper(ctx);
  await clearMessageAndOnceEventsHepler(this, id);

  const contents = await contentService.getContentByCategory(data);

  console.log(contents);

  // for (let content of contents) {
  //   this.sendMessage(id, content)
  // }

}