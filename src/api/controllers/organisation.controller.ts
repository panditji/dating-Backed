import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import _ from 'lodash';
import { logger } from '../utils';

import {
  Organisation,
  status as OrganisationStatus,
} from '../../entity/Organisation';
import {
  OrganisationUser,
  role as userRole,
  status as orgUserStatus,
} from '../../entity/OrganisationUsers';
import { Address } from '../../entity/Address';
import {
  addressType,
  OrganisationAddresses,
} from '../../entity/OrganisationAddresses';
import { OrganisationUserFollow } from '../../entity/OrganisationUserFollow';
import bcryptService from '../services/bcrypt.service';
import { status } from '../../entity/User';

const checkAddressUnique = async (addressObj: any, res: any) => {
  const addressRepo = getRepository(Address);
  const addressHash = bcryptService().addressHash(addressObj);
  const addressExists = await addressRepo.findOne({ hash: addressHash });
  if (addressExists) {
    return false;
  }
  return addressHash;
};

const createOrganisation = async (req: any, res: any, next: NextFunction) => {
  try {
    const OrganisationRepo = getRepository(Organisation);
    const organisationUserRepo = getRepository(OrganisationUser);
    const addressRepo = getRepository(Address);
    const OrganisationAddressesRepo = getRepository(OrganisationAddresses);
    let companyAddressDetails, postAddressDetails, addressHash, postAddressHash;
    const { body } = req;
    const companyAddress = _.get(body, 'companyAddress', '');
    const isPostalAddressSame = _.get(body, 'isPostalAddress', false);
    const postAddress = isPostalAddressSame
      ? companyAddress
      : _.get(body, 'postAddress', '');
    const organisationDetailsObj = _.omit({ ...body }, [
      'companyAddress',
      'postAddress',
      'isPostalAddress',
    ]);
    if (companyAddress) {
      addressHash = await checkAddressUnique(companyAddress, res);
      if (!addressHash) {
        return res.status(401).json({ msg: 'company Address already exists' });
      }
    }
    if (!isPostalAddressSame && postAddress) {
      postAddressHash = await checkAddressUnique(postAddress, res);
      if (!postAddressHash) {
        return res.status(401).json({ msg: 'postal Address already exists' });
      }
    }
    const savedOrganisation = await OrganisationRepo.save(
      organisationDetailsObj
    );
    const user = req.state.user;
    const commonFields = {
      createdBy: user.id,
      updatedBy: user.id,
    };
    if (companyAddress) {
      companyAddressDetails = await addressRepo.save({
        ...companyAddress,
        hash: addressHash,
      });
      const organisationAdressMappingObj = {
        organisation: savedOrganisation,
        address: _.get(companyAddressDetails, 'id'),
        isPostalAddress: isPostalAddressSame,
        ...commonFields,
      };
      OrganisationAddressesRepo.save(organisationAdressMappingObj);
    }
    if (postAddress && !isPostalAddressSame) {
      postAddressDetails = await addressRepo.save({
        ...postAddress,
        hash: postAddressHash,
      });
      const organisationAdressMappingObj = {
        organisation: savedOrganisation,
        address: postAddressDetails,
        type: addressType.POSTAL,
        isPostalAddress: isPostalAddressSame,
        ...commonFields,
      };
      OrganisationAddressesRepo.save(organisationAdressMappingObj);
    }
    const mappingObj = {
      organisation: savedOrganisation,
      user: user.id,
      createdBy: user.id,
      updatedBy: user.id,
      role: userRole.OWNER,
    };
    await organisationUserRepo.save(mappingObj);
    res
      .status(201)
      .json({ msg: 'success', data: { organisation: { savedOrganisation } } });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getOrganisationById = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  try {
    const organisationId = req.params.id;
    const OrganisationRepo = getRepository(Organisation);
    let orgObj;
    if (!organisationId) {
      orgObj = await OrganisationRepo.find({
        where: [
          { status: OrganisationStatus.DRAFT },
          { status: OrganisationStatus.PUBLISHED },
        ],
      });
    } else {
      orgObj = await OrganisationRepo.findOne({
        where: [
          { status: OrganisationStatus.DRAFT, id: organisationId },
          { status: OrganisationStatus.PUBLISHED, id: organisationId },
        ],
      });
    }
    if (orgObj) {
      return res
        .status(201)
        .json({ msg: 'success', data: { organisations: orgObj } });
    }
    res.status(201).json({ msg: res.__('NO_ORGANISATION_FOUND') });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteOrganisationById = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const organisationId = req.params.id;
    const OrganisationRepo = getRepository(Organisation);
    const orgObj = await OrganisationRepo.findOne({
      where: [
        { status: OrganisationStatus.DRAFT, id: organisationId },
        { status: OrganisationStatus.PUBLISHED, id: organisationId },
      ],
    });
    const user = req.state.user;
    if (!orgObj || !_.get(user, 'id')) {
      return res.status(201).json({ msg: res.__('NO_ORGANISATION_FOUND') });
    }
    await OrganisationRepo.update(
      { id: organisationId },
      { status: OrganisationStatus.DELETED, deletedBy: user.id }
    );
    res.status(201).json({ msg: 'success', data: { id: organisationId } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateOrganisationById = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const organisationId = req.params.id;
    const user = req.state.user;
    const OrganisationRepo = getRepository(Organisation);
    const organisationAddressesRepo = getRepository(OrganisationAddresses);
    const addressRepo = getRepository(Address);
    let addressHash, postAddressHash, ispostalAddressSamePrevious;
    const orgObj = await OrganisationRepo.findOne({
      where: [
        { status: OrganisationStatus.DRAFT, id: organisationId },
        { status: OrganisationStatus.PUBLISHED, id: organisationId },
      ],
    });
    if (!orgObj) {
      return res.status(201).json({ msg: res.__('NO_ORGANISATION_FOUND') });
    }
    const companyAddress = _.get(req, 'body.companyAddress');
    // need to be handled in case postal address is not provided and isPostalChange to false
    const isPostalAddressSame = _.get(req, 'body.isPostalAddress');
    const postAddress = _.get(req, 'body.postAddress');
    const organisationAddressObj = isPostalAddressSame
      ? {
          updatedBy: _.get(user, 'id'),
          isPostalAddress: isPostalAddressSame,
        }
      : { updatedBy: _.get(user, 'id') };
    if (companyAddress || isPostalAddressSame) {
      const orgAddresses = await organisationAddressesRepo.findOne({
        where: { organisation: organisationId, type: addressType.COMPANY },
        relations: ['address'],
      });
      const commonFields = {
        createdBy: user.id,
        updatedBy: user.id,
      };
      if (orgAddresses) {
        const addressId = _.get(orgAddresses, 'address.id');
        const addressDetails = _.get(orgAddresses, 'address');
        const companyAddressToBeUpdated = {
          ...addressDetails,
          ...companyAddress,
        };
        addressHash = await checkAddressUnique(companyAddressToBeUpdated, res);
        if (!addressHash) {
          return res
            .status(401)
            .json({ msg: 'company Address already exists' });
        }

        await addressRepo.update({ id: addressId }, companyAddressToBeUpdated);
        await organisationAddressesRepo.update(
          { id: _.get(orgAddresses, 'id') },
          organisationAddressObj
        );
      } else {
        addressHash = await checkAddressUnique(companyAddress, res);
        if (!addressHash) {
          return res
            .status(401)
            .json({ msg: 'company Address already exists' });
        }
        const companyAddressDetails = await addressRepo.save(companyAddress);
        const organisationAdressMappingObj = {
          organisation: orgObj,
          address: companyAddressDetails,
          ...commonFields,
          ...organisationAddressObj,
        };
        await organisationAddressesRepo.save(organisationAdressMappingObj);
      }
    }
    if (postAddress) {
      const orgPostAddress = await organisationAddressesRepo.findOne({
        where: { organisation: organisationId, type: addressType.POSTAL },
        relations: ['address'],
      });
      const commonFields = {
        createdBy: user.id,
        updatedBy: user.id,
      };
      if (orgPostAddress) {
        const addressId = _.get(orgPostAddress, 'address.id');
        const addressDetails = _.get(orgPostAddress, 'address');
        const postAddressToBeUpdated = {
          ...addressDetails,
          ...companyAddress,
        };
        postAddressHash = await checkAddressUnique(postAddressToBeUpdated, res);
        if (!postAddressHash) {
          return res.status(401).json({ msg: 'postal Address already exists' });
        }
        await addressRepo.update({ id: addressId }, postAddressToBeUpdated);
        await organisationAddressesRepo.update(
          { id: _.get(orgPostAddress, 'id') },
          { updatedBy: _.get(user, 'id'), isPostalAddress: false }
        );
      } else {
        postAddressHash = await checkAddressUnique(postAddress, res);
        if (!postAddressHash) {
          return res.status(401).json({ msg: 'postal Address already exists' });
        }
        const postalAddressDetails = await addressRepo.save(postAddress);
        const organisationAdressMappingObj = {
          organisation: orgObj,
          address: postalAddressDetails,
          type: addressType.POSTAL,
          ...commonFields,
          isPostalAddress: false,
        };
        await organisationAddressesRepo.save(organisationAdressMappingObj);
      }
    }
    const orgToBeUpdated = _.omit(
      {
        ...orgObj,
        ...req.body,
        updatedBy: _.get(user, 'id'),
      },
      ['updated', 'companyAddress', 'postAddress']
    );
    await OrganisationRepo.update({ id: organisationId }, orgToBeUpdated);
    res.status(201).json({ msg: 'success', data: { id: organisationId } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const follow = async (req: any, res: any, next: NextFunction) => {
  try {
    const organisationId = req.params.id;
    const OrganisationRepo = getRepository(Organisation);
    const organisationFollowRepo = getRepository(OrganisationUserFollow);
    const orgObj = await OrganisationRepo.findOne({
      where: [
        { status: OrganisationStatus.DRAFT, id: organisationId },
        { status: OrganisationStatus.PUBLISHED, id: organisationId },
      ],
    });
    if (!orgObj) {
      return res.status(201).json({ msg: res.__('NO_ORGANISATION_FOUND') });
    }
    const isOrganisationAlreadyFollowed = await organisationFollowRepo.findOne({
      where: { organisation: orgObj },
    });
    if (isOrganisationAlreadyFollowed) {
      res
        .status(401)
        .json({ msg: 'user has followed this organisation previously' });
    }
    const followDetails = await organisationFollowRepo.save({
      organisation: orgObj,
      user: _.get(req, 'state.user'),
    });
    res.status(200).json({ msg: 'success', data: { followDetails } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const unFollow = async (req: any, res: any, next: NextFunction) => {
  try {
    const organisationId = req.params.id;
    const OrganisationRepo = getRepository(Organisation);
    const organisationFollowRepo = getRepository(OrganisationUserFollow);
    const orgObj = await OrganisationRepo.findOne({
      where: [
        { status: OrganisationStatus.DRAFT, id: organisationId },
        { status: OrganisationStatus.PUBLISHED, id: organisationId },
      ],
    });
    if (!orgObj) {
      return res.status(201).json({ msg: res.__('NO_ORGANISATION_FOUND') });
    }
    const isOrganisationFollowed = await organisationFollowRepo.findOne({
      where: { organisation: orgObj },
    });
    if (!isOrganisationFollowed) {
      res.status(401).json({ msg: 'user has not followed this organisation' });
    }
    const unFollowDetails = await organisationFollowRepo.delete({
      organisation: orgObj,
    });
    res.status(200).json({ msg: 'success', data: { unFollowDetails } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const transfer = async (req: any, res: any, next: NextFunction) => {
  try {
    const orgId = req.params.id;
    const userId = req.query.userId;
    const loggedInUser = req.state.user.user;
    const orgDetails = await getRepository(Organisation).findOne({ id: orgId });
    if (!orgId || !orgDetails || !userId) {
      return res.status(401).json({ msg: 'Plean enter valid details' });
    }
    const orgUserRepo = getRepository(OrganisationUser);
    await orgUserRepo.update(
      { organisation: orgId, role: userRole.OWNER },
      { status: orgUserStatus.INACTIVE }
    );
    const orgOwner = await orgUserRepo.save({
      role: userRole.OWNER,
      status: orgUserStatus.ACTIVE,
      organisation: orgDetails,
      user: userId,
      createdBy: loggedInUser,
      updatedBy: loggedInUser,
    });
    res.status(201).json({ msg: 'success', data: { details: orgOwner } });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
export {
  createOrganisation,
  getOrganisationById,
  deleteOrganisationById,
  updateOrganisationById,
  follow,
  unFollow,
  transfer,
};
