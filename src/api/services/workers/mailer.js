import { parentPort } from 'worker_threads';
import nodemailer from 'nodemailer';

import { logger } from "../../utils";

const sendEmail = async ({ to, subject, template, from = process.env.EMAIL_FROM }) => {
  logger.debug(to, subject, template);
  try {
    const transporter = nodemailer.createTransport({
      sendmail: true,
      newline: 'unix',
      path: '/usr/sbin/sendmail'
    })

    return await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: template
    })

  } catch (error) {
    logger.error("Email Error", error)
  }
}

(() => logger.debug('I am worker thread'))()

function i_am_worker() {
  parentPort.on('message', (mailDetails) => {
    logger.debug(`worker received ${mailDetails}`);
    sendEmail(mailDetails);
    parentPort.postMessage('mail sent!');
  })
};

i_am_worker();

export default i_am_worker;
