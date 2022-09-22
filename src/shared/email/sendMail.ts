import { EMAIL } from '../../constants';
import { ISendEmail } from '../../interfaces';
import { logger } from '../logger';
import { timeBr } from '../moment';
import { transporter } from './config';
import { recoveryTemplate } from './template/recovery';

export async function sendMail(professionalName: string, payload: ISendEmail) {
  try {
    const { code, name, email } = payload;

    await transporter.verify();

    const html = recoveryTemplate(code, name, professionalName);

    const status = await transporter.sendMail({
      html,
      from: EMAIL.FROM,
      to: email,
      subject: `Olá ${name}, seu código de acesso chegou!`,
      text: ` ${name}, seja bem vindo(a) ao "DoutoraMente", você foi cadastrado(a) no
      sistema por ${professionalName}. Para usar o sistema você precisa informar seu email: {email} e o
      código temporário de acesso:${code}. E não esqueça de cadastrar uma senha segura.`,
    });

    logger.info(`[EMAIL SEND] => ${Object.values(status)} | [${timeBr}]`);
    return;
  } catch (error) {
    console.log({ context: 'sendMail', error });
  }
}
