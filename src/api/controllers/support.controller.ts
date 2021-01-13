import { Request, Response, NextFunction } from 'express';
import { getManager, Connection, ConnectionManager, getRepository, In, Like, getConnection } from 'typeorm';
import _ from 'lodash';
import { logger } from "../utils";
import { User } from '../../entity/User';
import { Status, status as userStatus } from '../../entity/Status'
import { Support } from '../../entity/Support';


const supportCreate = async (req: any, res: Response, next: NextFunction) => {
    try {
        const supporteRepo = getRepository(Support);
        const userRepo = getRepository(User);
        const statusRepo = getRepository(Status);
        let userId = req.state.user.id;
        let statusActive = userStatus.ACTIVE
        const checkActiveId = await statusRepo.findOne({
            where: { status: statusActive }
        });
        if (!checkActiveId) {
            return res
                .status(400)
                .json({ errCode: 'ERR_Status_Not_Defined_By_ADMIN', msg: res.__('ERR_Status_Not_Defined_By_ADMIN') });
        }
        const userExists = await userRepo.findOne({ id: userId })
        if (userExists) {
            const insertSupport: Partial<Support> = {
                userId: userId,
                type: req.body.type,
                message: req.body.message,
                images: req.body.images,
                statusId: checkActiveId.id,
            }
            var support = await supporteRepo.save(insertSupport);
            return res.status(201).json({ msg: 'success', data: { support } });
        }
        return res.status(200).json({
            errCode: 'ERR_NOT_A_VALID_USER',
            msg: res.__('ERR_NOT_A_VALID_USER'),
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const suppportGetALL = async (req: any, res: Response, next: NextFunction) => {
    try {
        const supporteRepo = getRepository(Support);
        const userRepo = getRepository(User);
        // const userExists = await userRepo.findOne()
        //const data = await supporteRepo.find({ relations: ['status', 'user:{user.id,user.firstName}'] });


        // const data = await getRepository(Support).createQueryBuilder("support")
        //     .leftJoinAndSelect("support.status", "status")
        //     .leftJoinAndSelect("support.user", "user")
        //     .select(['support.id', 'support.type', 'support.images', 'support.message', 'status.status', 'user.firstName', 'user.firstName'
        //         , 'user.lastName', 'user.phoneNumber', 'user.email', 'user.dob', 'user.AboutMe']) // added selection
        //     .where({ id: 5 })
        //     .getMany();
        const data = await getRepository(Support).createQueryBuilder("support")
            .leftJoinAndSelect("support.status", "status")
            .leftJoinAndSelect("support.user", "user")
            .select(['support.id', 'support.type', 'support.images', 'support.message', 'status.status', 'user.firstName', 'user.firstName'
                , 'user.lastName', 'user.phoneNumber', 'user.email', 'user.dob', 'user.AboutMe']) // added selection
            .getMany();
        return res.status(201).json({ msg: 'success', data: { data } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};






export { supportCreate, suppportGetALL };