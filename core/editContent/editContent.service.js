import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class EditContentService {
  constructor() { this.db = new PrismaClient() }

  async getCategoryTitleByContentDescription(description) {
    const content = await this.db.content.findUnique({ where: { description }, include: { category: true } });
    return content.category.title;
  }

  async addNewDescription({ oldDescription, newDescription }) {
    return this.db.content.update({ where: { description: oldDescription }, data: { description: newDescription } });
  }

  async addNewContent({ description, data, format }) {
    return this.db.content.update({ where: { description }, data: { data, format } });
  }

};

export const editContentService = new EditContentService();