import { Request, Response, NextFunction } from 'express';
import { getManager, Connection, ConnectionManager, getRepository, In, Like, getConnection } from 'typeorm';
import _ from 'lodash';
import { logger } from "../utils";
import { Match } from '../../entity/Match';

const matchCreate = async (req: any, res: Response, next: NextFunction) => {
    try {
        const matchRepo = getRepository(Match);
        const insertMatch: Partial<Match> = {
            userId: req.state.user.id,
            matchUserId: req.body.matchUserId,
            type: req.body.type,
            removeFromChat: req.body.removeFromChat,
            status: req.body.status
        }
        var match = await matchRepo.save(insertMatch);
        return res.status(201).json({ msg: 'success', data: { match } });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};

const updateMatch = async (req: any, res: Response, next: NextFunction) => {
    try {
        const matchRepo = getRepository(Match);
        req.body.status = 'active';
        const { id } = req.params
        let userId = req.state.user.id;
        const updateMatch: Partial<Match> = {
            matchUserId: req.body.matchUserId,
            type: req.body.type,
            removeFromChat: req.body.removeFromChat,
            status: req.body.status
        }
        const update = await matchRepo.update(id, updateMatch);
        return res.status(201).json({ msg: 'success', data: { update } });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const matchGetAll = async (req: any, res: Response, next: NextFunction) => {
    try {
        const matchRepo = getRepository(Match);
        const { type } = req.params
        if (type == 'all') {
            const data = await matchRepo.find({
                relations: ['user'],
            });
            return res.status(201).json({ msg: 'success', data: { data } });
        }
        else {
            const data = await matchRepo.find({
                relations: ['user'], where: { type: type }
            });
            return res.status(201).json({ msg: 'success', data: { data } });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// const helpDeleted = async (req: any, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params
//         const data = await getConnection().createQueryBuilder().delete().from(Help).where("id = :id", { id: id }).execute();
//         return res.status(201).json({ msg: 'success', data: { data } });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };

export { matchCreate, matchGetAll, updateMatch };