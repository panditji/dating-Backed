import { Response, NextFunction } from 'express';
import { getRepository, In } from 'typeorm';
import _ from 'lodash';
import { Organisation } from '../../entity/Organisation';
import { BankAccounts } from '../../entity/BankAccounts';
import {
  OrganisationBanks,
  status as organisationBankStatus,
} from '../../entity/organisationBanks';

const createBankAccount = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const BankAccountsRepo = getRepository(BankAccounts);
    const OrganisationRepo = getRepository(Organisation);
    const OrganisationBankRepo = getRepository(OrganisationBanks);
    const organisationId = req.params.id;
    const orgObj = await OrganisationRepo.findOne({
      where: { id: organisationId },
    });
    if (!orgObj) {
      return res.status(401).json({ msg: 'organisation doesnot exist' });
    }
    const { body } = req;
    const user = req.state.user;
    if (!user) {
      return res.status(401).json({ msg: 'user not found' });
    }
    const bankAccountDetails = await BankAccountsRepo.save({
      stripeId: _.get(body, 'stripeId'),
    });
    const { id: bankAccountId } = bankAccountDetails;
    const organisationBankObj = {
      organisation: orgObj,
      bank: bankAccountDetails,
      status: organisationBankStatus.ACTIVE,
      createdBy: _.get(user, 'id'),
      updatedBy: _.get(user, 'id'),
    };
    if (!bankAccountId) {
      res.status(401).json({ msg: 'Invalid Bank Details' });
    }
    await OrganisationBankRepo.save(organisationBankObj);
    res.status(201).json(bankAccountDetails);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateBankAccountDetails = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const BankAccountsRepo = getRepository(BankAccounts);
    const OrganisationBankRepo = getRepository(OrganisationBanks);
    const bankAccountId = req.params.id;
    const bankAccountDetails = await BankAccountsRepo.findOne({
      where: { id: bankAccountId },
    });
    if (!bankAccountDetails) {
      return res.status(401).json({ msg: 'Bank Account does not exist' });
    }
    const updatedStripeId =
      _.get(req, 'body.stripeId') || _.get(bankAccountDetails, 'stripeId');
    const updateBankAccountObj = {
      ...bankAccountDetails,
      stripeId: updatedStripeId,
    };
    await BankAccountsRepo.update({ id: bankAccountId }, updateBankAccountObj);
    const user = req.state.user;
    if (!user) {
      return res.status(401).json({ msg: 'user not found' });
    }
    const organisationBankObj = {
      status: organisationBankStatus.ACTIVE,
      updatedBy: _.get(user, 'id'),
    };
    await OrganisationBankRepo.update(
      { id: bankAccountId },
      organisationBankObj
    );
    res.status(201).json({ msg: 'success', data: { id: bankAccountId } });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getByOrganisationId = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const organisationBankRepo = getRepository(OrganisationBanks);
    const organisationId = req.params.id;
    const bankAccounts = await organisationBankRepo.find({
      where: { organisation: organisationId },
      relations: ['bank'],
    });
    if (!bankAccounts) {
      return res
        .status(201)
        .json({ msg: 'No bank Account available for this organisation' });
    }
    const bankAccountIdetails = _.chain(bankAccounts)
      .map((account) => _.get(account, 'bank'))
      .compact()
      .value();
    // const bankAccountDetails = await bankAccountRepo.find({
    //   where: { id: In(bankAccountIds) },
    // });
    res.status(201).json({ msg: 'success', data: bankAccountIdetails });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export { createBankAccount, updateBankAccountDetails, getByOrganisationId };
