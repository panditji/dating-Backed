import { Request, Response, NextFunction } from 'express';
import { getManager, Connection, ConnectionManager, getRepository, In, Like, getConnection } from 'typeorm';
import _ from 'lodash';
import { logger } from "../utils";
import { User } from '../../entity/User';
import { IdealFirstDate } from '../../entity/IdealFirstDate';
import bcryptService from '../services/bcrypt.service';


const insertIdealFirstDate = async (req: any, res: Response, next: NextFunction) => {
    try {
        const idealFirstDateRepo = getRepository(IdealFirstDate);
        let userId = req.state.user.id;
        const insertFirstDate: Partial<IdealFirstDate> = {
            idealFirstDate: req.body.idealFirstDate,
            createdBy: userId
        }
        var insertIdealFirst = await idealFirstDateRepo.save(insertFirstDate);
        return res.status(201).json({ msg: 'success', data: { insertIdealFirst } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const updateIdealFirstDate = async (req: any, res: Response, next: NextFunction) => {
    try {
        const idealFirstDateRepo = getRepository(IdealFirstDate);
        const { id } = req.params
        let userId = req.state.user.id;
        const updateFirstDate: Partial<IdealFirstDate> = {
            idealFirstDate: req.body.idealFirstDate,
            updatedBy: userId
        }
        const updateIdealFirst = await idealFirstDateRepo.update(id, updateFirstDate);
        return res.status(201).json({ msg: 'success', data: { updateIdealFirst } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const IdealFirstDateGetALL = async (req: any, res: Response, next: NextFunction) => {
    try {
        const idealFirstDateRepo = getRepository(IdealFirstDate);
        const data = await idealFirstDateRepo.find();
        return res.status(201).json({ msg: 'success', data: { data } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const IdealFirstDateDeleted = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        // const idealFirstDateRepo = getRepository(IdealFirstDate);
        // const data = await idealFirstDateRepo.query(`SELECT * FROM IdealFirstDate where id = '${id}'`)
        const data = await getConnection().createQueryBuilder().delete().from(IdealFirstDate).where("id = :id", { id: id }).execute();
        return res.status(201).json({ msg: 'success', data: { data } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export { insertIdealFirstDate, updateIdealFirstDate, IdealFirstDateGetALL, IdealFirstDateDeleted };