import { Request, Response, NextFunction } from 'express';
import { getManager, Connection, ConnectionManager, getRepository, In, Like, getConnection } from 'typeorm';
import _ from 'lodash';
import { logger } from "../utils";
import { User } from '../../entity/User';

const matchingProfile = async (req: any, res: any, next: NextFunction) => {
    try {
        const UserRepo = getRepository(User);
        let userId = req.state.user.id;
        let whereQuery: any = [{ id: userId }];
        const existingUser = await UserRepo.findOne({
            where: whereQuery
        });
        if (existingUser) {
            var data = await getRepository(User).createQueryBuilder("user")
                .leftJoinAndSelect("user.status", "status")
                .select(['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.phoneNumber', 'user.avatar', 'user.dob', 'user.wantChildren', 'user.educationLevel', 'user.smoke', 'user.drink', 'user.myersBriggs', 'user.FirstDate', 'user.Expensive', 'user.gender', 'status.status']) // added selection
                .where("user.gender = :gender AND status.status = :status", { gender: existingUser.interestedGender, status: 'Active' })
                .getMany();
            let processedArray: any = [];
            await Promise.all(data.map(async data1 => {
                let dataObject = JSON.parse(JSON.stringify(data1));
                dataObject.count = 0;
                (dataObject.educationLevel == existingUser.educationLevel) ? dataObject.count += 1 : dataObject.count += 0;
                (dataObject.wantChildren == existingUser.wantChildren) ? dataObject.count += 1 : dataObject.count += 0;
                (dataObject.smoke == existingUser.smoke) ? dataObject.count += 1 : dataObject.count += 0;
                (dataObject.drink == existingUser.drink) ? dataObject.count += 1 : dataObject.count += 0;
                (dataObject.myersBriggs == existingUser.myersBriggs) ? dataObject.count += 1 : dataObject.count += 0;
                (dataObject.idealFirstDateId == existingUser.idealFirstDateId) ? dataObject.count += 1 : dataObject.count += 0;
                (dataObject.expensiveFirstDateId == existingUser.expensiveFirstDateId) ? dataObject.count += 1 : dataObject.count += 0;
                processedArray.push(dataObject);
            }));
            processedArray = _.orderBy(processedArray, ['count'], 'desc');
            // console.log(processedArray);
            return res.status(201).json({ msg: 'success', data: { processedArray } });
        }
    } catch (error) {
        logger.error(error);
        return next(error);
    }
};
export { matchingProfile };
