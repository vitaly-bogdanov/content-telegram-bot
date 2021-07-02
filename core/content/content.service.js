import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ContentService {
  constructor() { this.db = new PrismaClient() }

  async getContentByCategoryTitle(title) {
    const category = await this.db.category.findUnique({ where: { title }, include: { contents: true } });
    return category.contents;
  }

  async deleteContentById(id) {
    await this.db.content.delete({ where: { id: +id } });
  }

};

export const contentService = new ContentService();