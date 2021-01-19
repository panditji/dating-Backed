import { Request, Response, NextFunction } from 'express';
import { getManager, Connection, ConnectionManager, getRepository, In, Like, getConnection } from 'typeorm';
import _ from 'lodash';
import { logger } from "../utils";
import { Venues } from '../../entity/Venues';
import { ExpensiveFirstDateMaster } from '../../entity/ExpensiveFirstDateMaster';
import bcryptService from '../services/bcrypt.service';

//create
const insertVenues = async (req: any, res: Response, next: NextFunction) => {
    try {
        const venuesRepo = getRepository(Venues);
        let userId = req.state.user.id;
        const insertVenues: Partial<Venues> = {
            addressId: req.body.addressId,
            userId: userId,
            name: req.body.name,
            images: req.body.images,
            aboutVenue: req.body.aboutVenue,
            abn: req.body.abn,
            type: req.body.type,
            statusId: req.body.statusId,
            createdBy: userId
        }
        var insertVenuesOutput = await venuesRepo.save(insertVenues);
        return res.status(201).json({ msg: 'success', data: { insertVenuesOutput } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const updateVenues = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const venuesRepo = getRepository(Venues);
        let userId = req.state.user.id;
        const updateVenues: Partial<Venues> = {
            addressId: req.body.addressId,
            userId: userId,
            name: req.body.name,
            images: req.body.images,
            aboutVenue: req.body.aboutVenue,
            abn: req.body.abn,
            type: req.body.type,
            statusId: req.body.statusId,
            createdBy: userId
        }
        const updateVenuesOutput = await venuesRepo.update(id, updateVenues);
        return res.status(201).json({ msg: 'success', data: { updateVenuesOutput } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const VenuesGet = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const venuesRepo = getRepository(Venues);
        const data = await venuesRepo.findOne({ where: id });
        return res.status(201).json({ msg: 'success', data: { data } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const VenuesGetALL = async (req: any, res: Response, next: NextFunction) => {
    try {

        const venuesRepo = getRepository(Venues);
        const data = await venuesRepo.find();
        return res.status(201).json({ msg: 'success', data: { data } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const VenuesDeleted = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const data = await getConnection().createQueryBuilder().delete().from(Venues).where("id = :id", { id: id }).execute();

        return res.status(201).json({ msg: 'success', data: { data } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export { insertVenues, updateVenues, VenuesGet, VenuesGetALL, VenuesDeleted };