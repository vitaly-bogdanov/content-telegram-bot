import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class AddContentService {
  constructor() { this.db = new PrismaClient() }

  async create({ categoryTitle, description, data, format }) {
    const categoryId = await this.#getCategoryIdByTitle(categoryTitle);
    return this.db.content.create({ data: { description, data, format, categoryId } });
  }

  async #getCategoryIdByTitle(title) {
    const category = await this.db.category.findUnique({ where: { title }, select: { id: true } });
    return category.id;
  }

};

export const addContentService = new AddContentService();