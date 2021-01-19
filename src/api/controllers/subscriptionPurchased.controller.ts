import { Request, Response, NextFunction } from 'express';
import { getManager, Connection, ConnectionManager, getRepository, In, Like, getConnection } from 'typeorm';
import _ from 'lodash';
import { logger } from "../utils";
import { User } from '../../entity/User';
import { Status, status as userStatus } from '../../entity/Status'
import { SubscriptionPurchased } from '../../entity/SubscriptionPurchased';
import { SubscriptionPlans } from '../../entity/SubscriptionPlans';
import { DateTime } from 'luxon';


const subscriptionPurchasedCreate = async (req: any, res: Response, next: NextFunction) => {
    try {
        const subscriptionPlansRepo = getRepository(SubscriptionPlans);
        const subscriptionPurchasedRepo = getRepository(SubscriptionPurchased);
        const statusRepo = getRepository(Status);
        let userId = req.state.user.id;
        const checksubcriptionPlanId = await subscriptionPlansRepo.findOne({
            where: { id: req.body.subcriptionPlanId }
        });
        if (!checksubcriptionPlanId) {
            return res
                .status(400)
                .json({ errCode: 'ERR_SubcriptionPlan_Not_Defined_By_ADMIN', msg: res.__('ERR_SubcriptionPlan_Not_Defined_By_ADMIN') });
        }

        var startDate = new Date();
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + checksubcriptionPlanId.validateDays);
        var endDate = new Date(endDate.toLocaleString());

        const insertSubscriptionPurchased: Partial<SubscriptionPurchased> = {
            userId: userId,
            subcriptionPlanId: req.body.subcriptionPlanId,
            transactionId: req.body.transactionId,
            startDate: startDate,
            endDate: endDate,
            statusId: req.body.statusId,
            createdBy: userId,

        }
        var insertSubscriptionPurchasedOutput = await subscriptionPurchasedRepo.save(insertSubscriptionPurchased);

        return res.status(201).json({ msg: 'success', data: { insertSubscriptionPurchasedOutput } });

    } catch (error) {
        console.log(error);
        next(error);
    }
};


const updatesubscriptionPurchased = async (req: any, res: Response, next: NextFunction) => {
    try {
        const subscriptionPlansRepo = getRepository(SubscriptionPlans);
        const subscriptionPurchasedRepo = getRepository(SubscriptionPurchased);
        let userId = req.state.user.id;
        const { id } = req.params
        const checksubcriptionPlanId = await subscriptionPlansRepo.findOne({
            where: { id: req.body.subcriptionPlanId }
        });
        if (!checksubcriptionPlanId) {
            return res
                .status(400)
                .json({ errCode: 'ERR_SubcriptionPlan_Not_Defined_By_ADMIN', msg: res.__('ERR_SubcriptionPlan_Not_Defined_By_ADMIN') });
        }
        var startDate = new Date();
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + checksubcriptionPlanId.validateDays);
        var endDate = new Date(endDate.toLocaleString());
        const updateSubscriptionPurchased: Partial<SubscriptionPurchased> = {
            subcriptionPlanId: req.body.subcriptionPlanId,
            transactionId: req.body.transactionId,
            startDate: startDate,
            endDate: endDate,
            statusId: req.body.statusId
        }
        var updateSubscriptionPurchasedOutput = await subscriptionPurchasedRepo.update(id, updateSubscriptionPurchased);
        return res.status(201).json({ msg: 'success', data: { updateSubscriptionPurchasedOutput } });

    } catch (error) {
        console.log(error);
        next(error);
    }
};


const getsubscriptionPurchased = async (req: any, res: Response, next: NextFunction) => {
    try {
        let userId = req.state.user.id;
        const data = await getRepository(SubscriptionPurchased).createQueryBuilder("subscriptionPurchased")
            .leftJoinAndSelect("subscriptionPurchased.user", "user")
            .select(['subscriptionPurchased.id', 'subscriptionPurchased.subcriptionPlanId', 'subscriptionPurchased.transactionId', 'subscriptionPurchased.startDate', 'subscriptionPurchased.endDate', 'subscriptionPurchased.statusId', 'user.firstName', 'user.firstName'
                , 'user.lastName', 'user.phoneNumber', 'user.email', 'user.dob', 'user.AboutMe']) // added selection
            .where({ userId: userId })
            .getOne()
        return res.status(201).json({ msg: 'success', data: { data } });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

export { subscriptionPurchasedCreate, updatesubscriptionPurchased, getsubscriptionPurchased };