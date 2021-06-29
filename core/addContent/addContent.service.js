import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class AddContentService {
  constructor() { this.db = new PrismaClient() }

  async createContent(description, file) {
    return this.db.content.create({ data: { description, file } })
  }
};

export const addContentService = new AddContentService();