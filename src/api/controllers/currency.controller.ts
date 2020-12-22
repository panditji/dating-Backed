import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { clean, logger } from "../utils";
import { Currency, status as currencyStatus } from "../../entity/Currency";

const get = async (req: any, res: Response, next: NextFunction) => {
  try {
    const currencyRepo = getRepository(Currency);
    const { id } = req.params
    let foundCurrencies;
    if (id) 
      foundCurrencies = await currencyRepo.findOne(id) || {};
    else
      foundCurrencies = await currencyRepo.find() || [];
    return res.status(200).json({ msg: 'success', data: { currencies: foundCurrencies } });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const create = async (req: any, res: Response, next: NextFunction) => {
  try {

    const currencyRepo = getRepository(Currency);
    const { body } = req;

    const currencyMap: any = {
      name: body.name,
      symbol: body.symbol,
      abbreviation: body.abbreviation,
      flag: body.flag,
      isRoutingRequired: body.isRoutingRequired,
      createdBy: req.state.user.id,
    }
    clean(currencyMap);
    const createdCurrency = await currencyRepo.save(currencyMap);

    return res.status(201).json({ msg: 'success', data: { createdCurrency } });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const update = async (req: any, res: Response, next: NextFunction) => {
  try {
    const currencyRepo = getRepository(Currency);
    const { body } = req;
    const { id } = req.params;
    const currencyMap: any = {
      name: body.name,
      symbol: body.symbol,
      abbreviation: body.abbreviation,
      flag: body.flag,
      isRoutingRequired: body.isRoutingRequired,
      status: body.status,
      updatedBy: req.state.user.id,
    }
    clean(currencyMap);
    await currencyRepo.update({ id }, currencyMap);
    return res.status(200).json({ msg: 'success' });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

export default {
  get,
  create,
  update
}
