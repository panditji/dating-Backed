import { Request, Response, NextFunction } from 'express';
import { getManager, Connection, ConnectionManager, getRepository, In, Like, getConnection } from 'typeorm';
import _ from 'lodash';
import { logger } from "../utils";
import { User } from '../../entity/User';
import { Status, status as userStatus } from '../../entity/Status'
import { SubscriptionPlans } from '../../entity/SubscriptionPlans';
import { Match } from '../../entity/match';
import { AnyAaaaRecord } from 'dns';

const matchingProfile = async (req: any, res: any, next: NextFunction) => {
    try {
        const filter = req.query.filter;
        // const filteredUser = await getRepository(User).find({

        //     where: [
        //         { firstName: Like(`%${filter}%`), status: userStatus.ACTIVE },
        //         { lastName: Like(`%${filter}%`), status: userStatus.ACTIVE },
        //     ],
        // });
        // const filteredUser =  await getRepository(User).createQueryBuilder("user")
        //    .leftJoinAndSelect("user.status", "status")

        // if (!filteredUser) {
        //     return res.status(401).json({ msg: 'No user Match' });
        // }
        // return res
        //     .status(201)
        //     .json({ msg: 'success', data: { users: filteredUser } });

        // var makers = await getRepository(User).createQueryBuilder("user")
        //     .innerJoinAndSelect(
        //         "user.products",
        //         "products",
        //         "products.isLaunched = :isLaunched",
        //         {
        //             isLaunched: true
        //         }
        //     )
        //     .orderBy("products", "DESC")
        //     .getMany();
        // console.log("helloo im tesing")
        var data = await getRepository(User).createQueryBuilder("user")
            .leftJoinAndSelect("user.status", "status")
            // .leftJoinAndSelect("support.user", "user")
            .select(['user.id', 'user.interestedGender', 'user.wantChildren', 'user.educationLevel', 'user.smoke', 'user.drink', 'user.myersBriggs', 'user.FirstDate', 'user.Expensive', 'user.gender', 'user.dob', 'status.status', 'user.firstName', 'user.lastName'
                , 'user.lastName', 'user.phoneNumber', 'user.email', 'user.dob', 'user.AboutMe']) // added selection
            .where("user.interestedGender = :interestedGender OR status.status = :status", { interestedGender: 'Women', status: 'Active' })
            .getMany();
        let list: any = [];
        for (let i = 0; i < data.length; i++) {
            var interestedGender = 0;
            if (data[i].interestedGender == "Women") {
                var interestedGender = 1;
            }
            var educationLevel = 0;
            if (data[i].educationLevel == "Bachelors degree") {
                var educationLevel = 1;
            }

            var wantChildren = 0;
            if (data[i].wantChildren == "Definitely") {
                var wantChildren = 1;
            }

            var smoke = 0;
            if (data[i].smoke == "Yes-sometimes") {
                var smoke = 1;
            }

            var drink = 0;
            if (data[i].drink == "Regularly") {
                var drink = 1;
            }

            var myersBriggs = 0;
            if (data[i].myersBriggs == "INTJ") {
                var myersBriggs = 1;
            }

            var idealFirstDateId = 0;
            if (data[i].idealFirstDateId == 1) {
                var idealFirstDateId = 1;
            }

            var expensiveFirstDateId = 0;
            if (data[i].expensiveFirstDateId == 4) {
                var expensiveFirstDateId = 1;
            }

            list.push({
                id: data[i].id, interestedGender: interestedGender, educationLevel: educationLevel, wantChildren, smoke: smoke,
                drink: drink, myersBriggs: myersBriggs, idealFirstDateId: idealFirstDateId, expensiveFirstDateId: expensiveFirstDateId
            })
        }
        // var res1: any = Object.values(list)[0];
        // console.log("2.user:", res1.id)
        // console.log(res1.interestedGender + res1.educationLevel + res1.wantChildren + res1.smoke + res1.drink + res1.myersBriggs + res1.idealFirstDateId + res1.expensiveFirstDateId)

        // var res2: any = Object.values(list)[1];
        // console.log("2.user:", res2.id)
        // console.log(res2.interestedGender + res2.educationLevel + res2.wantChildren + res2.smoke + res2.drink + res2.myersBriggs + res2.idealFirstDateId + res2.expensiveFirstDateId)

        // var re3: any = Object.values(list)[2];
        // console.log("3.user:", re3.id)
        // console.log(re3.interestedGender + re3.educationLevel + re3.wantChildren + re3.smoke + re3.drink + re3.myersBriggs + re3.idealFirstDateId + re3.expensiveFirstDateId)

        // var res4: any = Object.values(list)[3];
        // console.log("4.user:", res4.id)
        // console.log(res4.interestedGender + res4.educationLevel + res4.wantChildren + res4.smoke + res4.drink + res4.myersBriggs + res4.idealFirstDateId + res4.expensiveFirstDateId)

        for (let i = 0; i < list.length; i++) {
            console.log("1")
            var res: any = Object.values(list)[i];
            console.log("user:", res.id)
            var count = res.interestedGender + res.educationLevel + res.wantChildren + res.smoke + res.drink + res.myersBriggs + res.idealFirstDateId + res.expensiveFirstDateId
            // var count = 7;
            const userRepo = getRepository(User);
            const updateCount: Partial<User> = {
                count: count
            }
            var updateIdealFirst = await userRepo.update(res.id, updateCount);

        }
        console.log("2")
        const search = await getRepository(User).createQueryBuilder("user")
            .leftJoinAndSelect("user.status", "status")
            .select(['user.id', 'user.interestedGender', 'user.wantChildren', 'user.educationLevel', 'user.smoke', 'user.drink', 'user.myersBriggs', 'user.FirstDate', 'user.Expensive', 'user.gender', 'user.dob', 'status.status', 'user.firstName', 'user.lastName'
                , 'user.lastName', 'user.phoneNumber', 'user.email', 'user.dob', 'user.AboutMe']) // added selection
            .where("user.interestedGender = :interestedGender AND status.status = :status", { interestedGender: 'Women', status: 'Active' })
            .orderBy("user.count", "DESC")
            .getMany();
        console.log(search)


        console.log("4")
        return res.status(201).json({ msg: 'success', data: { search } });




    } catch (error) {
        logger.error(error);
        return next(error);
    }
};




export { matchingProfile };