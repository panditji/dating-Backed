import { Response, NextFunction } from 'express';
import { getRepository, In } from 'typeorm';
import _ from 'lodash';

import {
  OrganisationUser,
  role as userRole,
  status as userStatus,
} from '../../entity/OrganisationUsers';
import { logger } from '../utils';

const changeRole = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const { organisationId, userId, role } = body;
    const orgUserRepo = getRepository(OrganisationUser);
    const orgUserDetails = await orgUserRepo.findOne({
      organisation: organisationId,
      user: userId,
    });
    const user = _.get(req, 'state.user.user');
    const commonObjToUpdate = {
      role: role,
      updatedBy: user,
      status: userStatus.INVITED,
    };
    if (orgUserDetails) {
      await orgUserRepo.update(
        { organisation: organisationId, user: userId },
        commonObjToUpdate
      );
      return res.status(201).json({ msg: 'success' });
    }
    await orgUserRepo.save({
      ...commonObjToUpdate,
      organisation: organisationId,
      user: userId,
      createdBy: user,
    });
    return res.status(201).json({ msg: 'success' });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const getByRole = async (req: any, res: any, next: NextFunction) => {
  try {
    const {
      role = [userRole.ADMIN, userRole.MANAGER, userRole.OWNER],
      orgId,
    } = req.query;
    console.log(role);
    if (!orgId) {
      res.status(401).json({ msg: 'Please enter valid organisation' });
    }
    const organisationUserRepo = getRepository(OrganisationUser);
    const filterOrgUsers = await organisationUserRepo.find({
      where: { role: In([role]), organisation: orgId },
      relations: ['user'],
    });
    console.log(filterOrgUsers);
    if (!filterOrgUsers) {
      res.status(401).json({ msg: `No user with role ${role} exists` });
    }
    res.status(200).json({ msg: 'success', data: { users: filterOrgUsers } });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

export { changeRole, getByRole };
