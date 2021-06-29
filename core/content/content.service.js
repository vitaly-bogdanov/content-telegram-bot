import Prisma from '@prisma/client';

import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';

const { PrismaClient } = Prisma;

class ContentService {
  constructor() { this.db = new PrismaClient() }

  async getContentByCategoryTitle(title) {
    const category = await this.db.category.findUnique({ where: { title }, include: { contents: true } });
    return category.contents;
  }

};

export const contentService = new ContentService();