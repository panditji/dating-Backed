import { Request, Response, NextFunction } from 'express';
import { getManager, Connection, ConnectionManager, getRepository, In, Like, getConnectionManager } from 'typeorm';
import _ from 'lodash';
import { logger } from "../utils";
import { User } from '../../entity/User';
import { Address } from '../../entity/address';
import bcryptService from '../services/bcrypt.service';


const profile = async (req: any, res: Response, next: NextFunction) => {
    try {
        const UserRepo = getRepository(User);
        const addressRepo = getRepository(Address);

        const { body } = req;
        let id = req.state.user.id;
        const userProfile: Partial<User> = {
            dob: req.body.dob,
            gender: req.body.gender,
            AboutMe: req.body.AboutMe,
            height: req.body.height,
            job: req.body.job,
            interestedGender: req.body.interestedGender
        }
        // const { addressLine, city, state, country, postCode, latitude, longitude } = body;
        //generate hash
        const createNewHash = bcryptService().addressHash(body);
        const userAddress: Partial<Address> = {
            userId: req.state.user.id,
            addressLine: req.body.addressLine,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            postCode: req.body.postCode,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            addressHash: createNewHash
        }

        let whereQuery: any = [{ id: id }];
        const existingUser = await UserRepo.findOne({
            where: whereQuery
        });
        //check addresss is exist or not
        if (existingUser) {
            if (existingUser.addressId) {
                const updateidealFirstDateEntity = await addressRepo.update(existingUser.addressId, userAddress);
            }
            else {
                var updateuserAddressEntity = await addressRepo.save(userAddress);
                userProfile.addressId = updateuserAddressEntity.id;
            }
        }
        const updateuserProfileEntity = await UserRepo.update({ id }, userProfile);

        return res.status(201).json({ msg: 'success', data: { updateuserProfileEntity } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getProfile = async (req: any, res: Response, next: NextFunction) => {
    try {
        const UserRepo = getRepository(User);
        const profile = await UserRepo.find(
            {
                relations: ['address'],
                where: { id: req.state.user.id }
            }
        );
        return res.status(200).json({ msg: 'success', data: { profile } });
    } catch (error) {
        logger.error(error);
        return next(error);
    }
};

const getAllProfile = async (req: any, res: Response, next: NextFunction) => {
    try {
        const UserRepo = getRepository(User);
        const profile = await UserRepo.find({
            relations: ['address']
        });

        return res.status(200).json({ msg: 'success', data: { profile } });
    } catch (error) {
        logger.error(error);
        return next(error);
    }
};

const avatar = async (req: any, res: Response, next: NextFunction) => {
    try {
        const UserRepo = getRepository(User);
        const { body } = req;
        const { avatar } = body
        const userAvatar: Partial<User> = {
            avatar: avatar
        }
        let id = req.state.user.id;
        const updateAvatar = await UserRepo.update({ id }, userAvatar);
        return res.status(200).json({ msg: 'success', data: { updateAvatar } });
    } catch (error) {
        logger.error(error);
        return next(error);
    }
};

const pictures = async (req: any, res: Response, next: NextFunction) => {
    try {
        const UserRepo = getRepository(User);
        const { body } = req;
        // const { pictures } = body
        // let pictures: any = [{
        //     "id": "1",
        //     path: "",
        //     displayOrder: 1,
        //     type: "image/video"

        // },
        // {
        //     "id": "2",
        //     path: "",
        //     displayOrder: 2,
        //     type: "image/video"
        // },
        // {
        //     "id": "3",
        //     path: "",
        //     displayOrder: 3,
        //     type: "image/video"
        // }
        // ]

        const userAvatar: Partial<User> = {
            images: req.body.pictures
        }
        let id = req.state.user.id;
        const updateAvatar = await UserRepo.update(id, userAvatar);
        return res.status(200).json({ msg: 'success', data: { updateAvatar } });
    } catch (error) {
        logger.error(error);
        return next(error);
    }
};
export { profile, getProfile, getAllProfile, avatar, pictures };