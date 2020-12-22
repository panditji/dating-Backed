import { Request, Response, NextFunction } from "express";
import { type } from "os";
import { getRepository } from "typeorm";

import { Event, status as eventStatus } from "../../entity/Event";

const createEvent = async (req: any, res: Response, next: NextFunction) => {
  try {

    const eventRepo = getRepository(Event);
    const { body } = req;

    const eventMap: any = {
      isPublic: body.isPublic,
      eventName: body.eventName,
      eventAbout: body.eventAbout,
      currency: body.currency,
      targetAmount: body.targetAmount,
      isPremiumPlacement: body.isPremiumPlacement,
      tags: body.tags,
      startDate: body.startDate,
      endDate: body.endDate,
      location: body.location,
      status: body.status,
      updatedBy: req.state.user.id,
    }
    // if (body.status) {
    //   eventMap.status = eventStatus[body.status];
    //}

    const event = await eventRepo.save(eventMap);

    return res.status(201).json({ msg: 'success', event });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const updateEvent = async (req: any, res: Response, next: NextFunction) => {
  try {
    const eventRepo = getRepository(Event);
    const { id } = req.params;
    const { body } = req;
    const eventMap = {
      isPublic: body.isPublic,
      eventName: body.eventName,
      eventAbout: body.eventAbout,
      currency: body.currency,
      targetAmount: body.targetAmount,
      isPremiumPlacement: body.isPremiumPlacement,
      tags: body.tags,
      startDate: body.startDate,
      endDate: body.endDate,
      location: body.location,
      status: body.status,
      updatedBy: req.state.user.id,
    };

    const updatedEvent = await eventRepo.update({ id }, eventMap);
    return res.status(201).json({ msg: 'success'});

  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export default {
  createEvent,
  updateEvent
}
