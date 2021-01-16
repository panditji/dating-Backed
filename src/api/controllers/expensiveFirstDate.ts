import { Request, Response, NextFunction } from 'express';
import { getManager, Connection, ConnectionManager, getRepository, In, Like, getConnection } from 'typeorm';
import _ from 'lodash';
import { logger } from "../utils";
import { User } from '../../entity/User';
import { ExpensiveFirstDateMaster } from '../../entity/ExpensiveFirstDateMaster';
import bcryptService from '../services/bcrypt.service';

//create
const insertExpensiveFirstDate = async (req: any, res: Response, next: NextFunction) => {
    try {
        const expensiveFirstDateRepo = getRepository(ExpensiveFirstDateMaster);
        let userId = req.state.user.id;
        const insertExpensiveFirstDate: Partial<ExpensiveFirstDateMaster> = {
            expensiveFirstDate: req.body.expensiveFirstDate,
            createdBy: userId
        }
        var insertExpensiveFirst = await expensiveFirstDateRepo.save(insertExpensiveFirstDate);
        return res.status(201).json({ msg: 'success', data: { insertExpensiveFirst } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const updateExpensiveFirstDate = async (req: any, res: Response, next: NextFunction) => {
    try {
        const expensiveFirstDateRepo = getRepository(ExpensiveFirstDateMaster);
        const { id } = req.params
        let userId = req.state.user.id;
        const updateExpensiveFirstDate: Partial<ExpensiveFirstDateMaster> = {
            expensiveFirstDate: req.body.expensiveFirstDate,
            updatedBy: userId
        }
        const updateIdealFirst = await expensiveFirstDateRepo.update(id, updateExpensiveFirstDate);
        return res.status(201).json({ msg: 'success', data: { updateIdealFirst } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const ExpensiveFirstDateGetALL = async (req: any, res: Response, next: NextFunction) => {
    try {
        const expensiveFirstDateRepo = getRepository(ExpensiveFirstDateMaster);
        const data = await expensiveFirstDateRepo.find();
        return res.status(201).json({ msg: 'success', data: { data } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const ExpensiveFirstDateDeleted = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const data = await getConnection().createQueryBuilder().delete().from(ExpensiveFirstDateMaster).where("id = :id", { id: id }).execute();

        return res.status(201).json({ msg: 'success', data: { data } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export { insertExpensiveFirstDate, updateExpensiveFirstDate, ExpensiveFirstDateGetALL, ExpensiveFirstDateDeleted };