import { getRepository } from "typeorm";
import { QueueEmail, messagePriority } from "../../entity/QueueEmail";
import emailService from "./email.service";

const emailQueueService = () => {
  const addToQueue = async (to: string, toName: string, body: string) => {
    const queueEmail = getRepository(QueueEmail);
    const emailObj = {
      to,
      toName,
      body,
      from: process.env.EMAIL_FROM,
      fromName: process.env.EMAIL_FROM_NAME
    }
    const email = await queueEmail.save(emailObj).catch(err => {
      console.log(err);
      return false
    })
    emailService().mailer({to, subject: 'Oktion', template: body});
    return true
  }
  return { addToQueue };
};

export default emailQueueService;
