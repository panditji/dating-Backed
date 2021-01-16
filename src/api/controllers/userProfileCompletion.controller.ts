import { Request, Response, NextFunction } from 'express';
import { getManager, Connection, ConnectionManager, getRepository, In, Like, getConnectionManager } from 'typeorm';
import _ from 'lodash';
import { logger } from "../utils";
import { User } from '../../entity/User';
import { UserToMatch } from '../../entity/userToMatch';
import { IdealFirstDate } from '../../entity/IdealFirstDate';
import { ExpensiveFirstDateMaster } from '../../entity/ExpensiveFirstDateMaster';
import removeNullUndefinedObject from '../services/auth.removeNullUndefinedObject';


const userProfileCompletion = async (req: any, res: Response, next: NextFunction) => {
    try {
        const UserRepo = getRepository(User);
        const IdealFirstDateRepo = getRepository(IdealFirstDate);
        const ExpensiveFirstDateMasterRepo = getRepository(ExpensiveFirstDateMaster);
        const { body } = req;
        let id = req.state.user.id
        const objectCheck = removeNullUndefinedObject(body); //remove null/undefined value
        const profileMoreInfo: Partial<User> = {
            wantChildren: objectCheck.wantChildren,
            educationLevel: objectCheck.educationLevel,
            smoke: objectCheck.smoke,
            myersBriggs: objectCheck.myersBriggs,
            drink: objectCheck.drink,
            linkedIn: objectCheck.linkedIn,
            idealFirstDateId: objectCheck.idealFirstDate,
            expensiveFirstDateId: objectCheck.expenseveFirstDateMaster
        }
        // const idealfirstDate: Partial<IdealFirstDate> = {
        //     idealFirstDate: checkCountryCode.idealFirstDate
        // }
        // const expensivefirstDate: Partial<ExpensiveFirstDateMaster> = {
        //     expensiveFirstDate: checkCountryCode.expenseveFirstDateMaster
        // }

        // let whereQuery: any = [{ id: id }];
        // const existingUser = await UserRepo.findOne({
        //     where: whereQuery
        // });
        //check idealFirstdate is exist or not
        // if (existingUser) {
        //     if (existingUser.idealFirstDateId) {
        //         const updateidealFirstDateEntity = await IdealFirstDateRepo.update(existingUser.idealFirstDateId, idealfirstDate);
        //     }
        //     else {
        //         const updateIdealFirstDateEntity = await IdealFirstDateRepo.save(idealfirstDate);
        //         profileMoreInfo.idealFirstDateId = updateIdealFirstDateEntity.id;
        //     }
        // }
        //check expensiveFirstDateId is exist or not
        // if (existingUser) {
        //     if (existingUser.expensiveFirstDateId) {
        //         const updateExpensiveFirstDateEntity = await ExpensiveFirstDateMasterRepo.update(existingUser.expensiveFirstDateId, expensivefirstDate);
        //     }
        //     else {
        //         const updateexpensiveFirstDateEntity = await ExpensiveFirstDateMasterRepo.save(expensivefirstDate);
        //         profileMoreInfo.expensiveFirstDateId = expensivefirstDate.id;
        //     }
        // }
        // profileMoreInfo.FirstDate = IdealFirstDate as IdealFirstDate;

        const updateprofileMoreInfoEntity = await UserRepo.update({ id }, profileMoreInfo);
        return res.status(201).json({ msg: 'success', data: { updateprofileMoreInfoEntity } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const getuserProfileCompletion = async (req: any, res: Response, next: NextFunction) => {
    try {
        const UserRepo = getRepository(User);
        const profile = await UserRepo.find(
            {
                relations: ['Expensive', 'FirstDate'],
                where: { id: req.state.user.id }
            }
        );
        return res.status(200).json({ msg: 'success', data: { profile } });
    } catch (error) {
        logger.error(error);
        return next(error);
    }
};

const usertomatch = async (req: any, res: Response, next: NextFunction) => {
    try {
        const UserRepo = getRepository(User);
        const UserToMatchRepo = getRepository(UserToMatch);
        const { body } = req;
        let id = req.state.user.id
        const checkCountryCode = removeNullUndefinedObject(body); //remove null/undefined value
        const profileMoreInfo: Partial<User> = {};
        const userToMatch: Partial<UserToMatch> = {
            heightMin: checkCountryCode.heightMin,
            heightMax: checkCountryCode.heightMax,
            ageMin: checkCountryCode.ageMin,
            ageMax: checkCountryCode.ageMax,
            wantChildren: checkCountryCode.wantChildren,
            educationLevel: checkCountryCode.educationLevel,
            myersBriggs: checkCountryCode.myersBriggs,
            interestedGender: checkCountryCode.interestedGender,
            distanceMax: checkCountryCode.distanceMax
        }

        let whereQuery: any = [{ id: id }];
        const existingUser = await UserRepo.findOne({
            where: whereQuery
        });
        //check idealFirstdate is exist or not
        if (existingUser) {
            if (existingUser.userToMatchId) {
                const updateidealFirstDateEntity = await UserToMatchRepo.update(existingUser.userToMatchId, userToMatch);
            }
            else {
                const updateuserToMatchEntity = await UserToMatchRepo.save(userToMatch);
                profileMoreInfo.userToMatchId = updateuserToMatchEntity.id;
            }
        }

        const updateUserTable = await UserRepo.update({ id }, profileMoreInfo);
        return res.status(200).json({ msg: 'success', data: { updateUserTable } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const getusertomatch = async (req: any, res: Response, next: NextFunction) => {
    try {
        const UserRepo = getRepository(User);
        const profile = await UserRepo.find(
            {
                relations: ['usertomatch'],
                where: { id: req.state.user.id }
            }
        );
        return res.status(200).json({ msg: 'success', data: { profile } });
    } catch (error) {
        logger.error(error);
        return next(error);
    }
};
export { userProfileCompletion, getuserProfileCompletion, usertomatch, getusertomatch };