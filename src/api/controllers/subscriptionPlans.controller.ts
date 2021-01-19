import { Request, Response, NextFunction } from 'express';
import { getManager, Connection, ConnectionManager, getRepository, In, Like, getConnection } from 'typeorm';
import _ from 'lodash';
import { logger } from "../utils";
import { User } from '../../entity/User';
import { Status, status as userStatus } from '../../entity/Status'
import { SubscriptionPlans } from '../../entity/SubscriptionPlans';


const subscriptionPlansCreate = async (req: any, res: Response, next: NextFunction) => {
    try {
        const subscriptionPlansRepo = getRepository(SubscriptionPlans);
        const statusRepo = getRepository(Status);
        let userId = req.state.user.id;
        const checkActiveId = await statusRepo.findOne({
            where: { id: req.body.statusId }
        });
        if (!checkActiveId) {
            return res
                .status(400)
                .json({ errCode: 'ERR_Status_Not_Defined_By_ADMIN', msg: res.__('ERR_Status_Not_Defined_By_ADMIN') });
        }
        const insertSubscriptionPlans: Partial<SubscriptionPlans> = {
            name: req.body.name,
            type: req.body.type,
            text: req.body.text,
            price: req.body.price,
            numberOfLove: req.body.numberOfLove,
            numberOfFiling: req.body.numberOfFiling,
            validateDays: req.body.validateDays,
            createdBy: userId,
            statusId: req.body.statusId
        }
        var insertSubscription = await subscriptionPlansRepo.save(insertSubscriptionPlans);
        return res.status(201).json({ msg: 'success', data: { insertSubscription } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const updateSubscriptionPlans = async (req: any, res: Response, next: NextFunction) => {
    try {
        const subscriptionPlansRepo = getRepository(SubscriptionPlans);
        const statusRepo = getRepository(Status);
        let userId = req.state.user.id;
        const checkActiveId = await statusRepo.findOne({
            where: { id: req.body.statusId }
        });
        if (!checkActiveId) {
            return res
                .status(400)
                .json({ errCode: 'ERR_Status_Not_Defined_By_ADMIN', msg: res.__('ERR_Status_Not_Defined_By_ADMIN') });
        }
        const updateSubscriptionPlans: Partial<SubscriptionPlans> = {
            name: req.body.name,
            type: req.body.type,
            text: req.body.text,
            price: req.body.price,
            numberOfLove: req.body.numberOfLove,
            numberOfFiling: req.body.numberOfFiling,
            validateDays: req.body.validateDays,
            updatedBy: userId,
            statusId: req.body.statusId
        }
        const updateSubscription = await subscriptionPlansRepo.update(req.params.id, updateSubscriptionPlans);
        return res.status(201).json({ msg: 'success', data: { updateSubscription } });
    } catch (error) {
        console.log(error);
        next(error);
    }

};


const subscriptionPlansGetAll = async (req: any, res: Response, next: NextFunction) => {
    try {
        const subscriptionPlansRepo = getRepository(SubscriptionPlans);
        const data = await subscriptionPlansRepo.find({ relations: ['status'], });
        return res.status(201).json({ msg: 'success', data: { data } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const subscriptionDeleted = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const subscriptionPlansRepo = getRepository(SubscriptionPlans);
        // const data = await getConnection().createQueryBuilder().delete().from(SubscriptionPlans).where("id = :id", { id: id }).execute();
        const updateSubscriptionPlansDelete: Partial<SubscriptionPlans> = {
            statusId: req.body.statusId
        }
        const data = await subscriptionPlansRepo.update(req.params.id, updateSubscriptionPlansDelete);
        return res.status(201).json({ msg: 'success', data: { data } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


export { subscriptionPlansCreate, updateSubscriptionPlans, subscriptionPlansGetAll, subscriptionDeleted };