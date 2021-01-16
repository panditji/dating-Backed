import { Request, Response, NextFunction } from 'express';
import { getManager, Connection, ConnectionManager, getRepository, In, Like, getConnection } from 'typeorm';
import _ from 'lodash';
import { logger } from "../utils";
import { User } from '../../entity/User';
import { IdealFirstDate } from '../../entity/IdealFirstDate';
import bcryptService from '../services/bcrypt.service';
import { Help } from '../../entity/Help';


const helpCreate = async (req: any, res: Response, next: NextFunction) => {
    try {
        const helpRepo = getRepository(Help);
        req.body.status = 'active';
        const insertHelp: Partial<Help> = {
            title: req.body.title,
            description: req.body.description,
            images: req.body.images,
            type: req.body.type,
            status: req.body.status
        }
        var help = await helpRepo.save(insertHelp);
        return res.status(201).json({ msg: 'success', data: { help } });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};

const updateHelp = async (req: any, res: Response, next: NextFunction) => {
    try {
        const helpRepo = getRepository(Help);
        req.body.status = 'active';
        const { id } = req.params
        let userId = req.state.user.id;
        const updateHelp: Partial<Help> = {
            title: req.body.title,
            description: req.body.description,
            images: req.body.images,
            type: req.body.type,
            status: req.body.status
        }
        const update = await helpRepo.update(id, updateHelp);
        return res.status(201).json({ msg: 'success', data: { update } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const helpGetAll = async (req: any, res: Response, next: NextFunction) => {
    try {
        const helpRepo = getRepository(Help);
        const { type } = req.params

        if (type == 'all') {
            const data = await helpRepo.find();
            return res.status(201).json({ msg: 'success', data: { data } });
        }
        else {
            const data = await helpRepo.find({ where: { type: type } });
            return res.status(201).json({ msg: 'success', data: { data } });
        }


    } catch (error) {
        console.log(error);
        next(error);
    }
};

const helpDeleted = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const data = await getConnection().createQueryBuilder().delete().from(Help).where("id = :id", { id: id }).execute();
        return res.status(201).json({ msg: 'success', data: { data } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export { helpCreate, updateHelp, helpGetAll, helpDeleted };