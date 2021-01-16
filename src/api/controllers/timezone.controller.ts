import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { clean, logger } from "../utils";
import { Timezone } from "../../entity/Timezone";

const get = async (req: any, res: Response, next: NextFunction) => {
  try {
    const timezoneRepo = getRepository(Timezone);
    const { id } = req.params
    let foundTimezones;
    if (id) 
      foundTimezones = await timezoneRepo.findOne(id) || {};
    else
      foundTimezones = await timezoneRepo.find() || [];
    return res.status(200).json({ msg: 'success', data: { timezones: foundTimezones } });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const create = async (req: any, res: Response, next: NextFunction) => {
  try {

    const timezoneRepo = getRepository(Timezone);
    const { body } = req;

    const timezoneMap: any = {
      countryCode: body.countryCode,
      latitude: body.latitude,
      logitude: body.logitude,
      utcOffset: body.utcOffset,
      text: body.text,
      createdBy: req.state.user.id
    }

    const createdTimezone = await timezoneRepo.save(timezoneMap);

    return res.status(201).json({ msg: 'success', data: { createdTimezone } });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const update = async (req: any, res: Response, next: NextFunction) => {
  try {
    const timezoneRepo = getRepository(Timezone);
    const { body } = req;
    const { id } = req.params;
    const timezoneMap: any = {
      countryCode: body.countryCode,
      latitude: body.latitude,
      logitude: body.logitude,
      utcOffset: body.utcOffset,
      text: body.text,
      updatedBy: req.state.user.id
    }
    clean(timezoneMap);
    await timezoneRepo.update({ id }, timezoneMap);
    return res.status(200).json({ msg: 'success' });

  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const remove = async (req: any, res: Response, next: NextFunction) => {
  try {
    const timezoneRepo = getRepository(Timezone);
    const { id } = req.params;
    await timezoneRepo.delete(id);
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
