import { Request, Response, NextFunction } from 'express';
import { getManager, Connection, ConnectionManager, getRepository, In, Like, getConnection } from 'typeorm';
import _ from 'lodash';
import { logger } from "../utils";
import { User } from '../../entity/User';
import { Status, status as userStatus } from '../../entity/Status'
import { SubscriptionPurchased } from '../../entity/SubscriptionPurchased';
import { Payments } from '../../entity/Payments';
import { DateTime } from 'luxon';


const paymentsCreate = async (req: any, res: Response, next: NextFunction) => {
    try {
        const paymentsRepo = getRepository(Payments);
        let userId = req.state.user.id;
        const insertpayments: Partial<Payments> = {
            userId: userId,
            venueId: req.body.venueId,
            paymentType: req.body.paymentType,
            paymentApproved: req.body.paymentApproved,
            paymentDescription: req.body.paymentDescription,
            transactionId: req.body.transactionId,
            paidAmount: req.body.paidAmount,
            createdBy: userId,
        }
        var insertpaymentsOutput = await paymentsRepo.save(insertpayments);

        return res.status(201).json({ msg: 'success', data: { insertpaymentsOutput } });

    } catch (error) {
        console.log(error);
        next(error);
    }
};


const updatepayments = async (req: any, res: Response, next: NextFunction) => {
    try {
        const paymentsRepo = getRepository(Payments);
        let userId = req.state.user.id;
        const { id } = req.params
        const updatePayments: Partial<Payments> = {
            venueId: req.body.venueId,
            paymentType: req.body.paymentType,
            paymentApproved: req.body.paymentApproved,
            paymentDescription: req.body.paymentDescription,
            transactionId: req.body.transactionId,
            paidAmount: req.body.paidAmount,
            createdBy: userId,
        }
        var updatePaymentsOutput = await paymentsRepo.update(id, updatePayments);
        return res.status(201).json({ msg: 'success', data: { updatePaymentsOutput } });

    } catch (error) {
        console.log(error);
        next(error);
    }
};


const getpayments = async (req: any, res: Response, next: NextFunction) => {
    try {
        let userId = req.state.user.id;
        const data = await getRepository(Payments).createQueryBuilder("payment")
            .leftJoinAndSelect("payment.user", "user")
            .select(['payment.id', 'payment.venueId', 'payment.paymentType', 'payment.paymentApproved', 'payment.paymentDescription', 'payment.transactionId', 'payment.paidAmount', 'user.firstName'
                , 'user.lastName', 'user.phoneNumber', 'user.email', 'user.dob', 'user.AboutMe']) // added selection
            .where({ userId: userId })
            .getOne()
        return res.status(201).json({ msg: 'success', data: { data } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export { paymentsCreate, updatepayments, getpayments };