import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { clean, logger } from "../utils";
import { Category } from "../../entity/Category";

const get = async (req: any, res: Response, next: NextFunction) => {
  try {
    const categoryRepo = getRepository(Category);
    const { id } = req.params
    let foundCategory;
    if (id) 
      foundCategory = await categoryRepo.findOne(id) || {};
    else
      foundCategory = await categoryRepo.find() || [];
    return res.status(200).json({ msg: 'success', data: { categories: foundCategory } });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const create = async (req: any, res: Response, next: NextFunction) => {
  try {

    const categoryRepo = getRepository(Category);
    const { body } = req;

    const categoryMap: any = {
      categoryName: body.categoryName,
      createdBy: req.state.user.id
    }

    const createdCategory = await categoryRepo.save(categoryMap);

    return res.status(201).json({ msg: 'success', data: { createdCategory } });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const update = async (req: any, res: Response, next: NextFunction) => {
  try {
    const categoryRepo = getRepository(Category);
    const { body } = req;
    const { id } = req.params;
    const categoryMap: any = {
      categoryName: body.categoryName,
      updatedBy: req.state.user.id
    }
    clean(categoryMap);
    await categoryRepo.update({ id }, categoryMap);
    return res.status(200).json({ msg: 'success' });

  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const remove = async (req: any, res: Response, next: NextFunction) => {
  try {
    const categoryRepo = getRepository(Category);
    const { id } = req.params;
    await categoryRepo.delete(id);
    return res.status(200).json({ msg: 'success' });

  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

export default {
  get,
  create,
  update,
  remove
}
