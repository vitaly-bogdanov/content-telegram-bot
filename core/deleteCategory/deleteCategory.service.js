import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class DeleteCategoryService {
  constructor() { this.db = new PrismaClient() }

  async isCategoryExist(title) {
    return !!(await this.#findCategoryByTitle(title));
  } 

  async deleteByTitle(title) {
    return await this.db.category.delete({ where: { title } });
  }

  async #findCategoryByTitle(title) {
    return await this.db.category.findUnique({ where: { title } });
  }
  
};

export const deleteCategoryService = new DeleteCategoryService();