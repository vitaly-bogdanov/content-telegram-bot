import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ChangeCategoryService {
  constructor() { this.db = new PrismaClient() }

  async filteredCategory(scheduleId) {
    const categories = await this.#getCategories();
    const activeCategories = await this.#getActiveCategories(scheduleId);
    return categories.filter(category => !activeCategories.find((activeCategory) => activeCategory.id === category.id));
  }

  async updateTimeCategory(timeId, categoryId) {
    return this.db.time.update({ where: { id: +timeId }, data: { categoryId: +categoryId } });
  }

  async #getCategories() {
    return this.db.category.findMany();
  }

  async #getActiveCategories(scheduleId) {
    const times = await this.db.time.findMany({ where: { scheduleId: +scheduleId }, include: { category: true } });
    const activeCategories = times.filter((time) => !!time.category).map((time) => time.category);
    return activeCategories;
  }

};

export const changeCategoryService = new ChangeCategoryService();