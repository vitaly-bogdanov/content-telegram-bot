import Prisma from '@prisma/client';

import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';

const { PrismaClient } = Prisma;

class ContentService {
  constructor() { this.db = new PrismaClient() }

  getContentByCategory(category) {
    
  }

};

export const contentService = new ContentService();