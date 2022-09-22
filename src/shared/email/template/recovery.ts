import moment from 'moment';
export const recoveryTemplate = (code: number, name: string, professionalName: string) => {
  const currentYear = moment().year();
  return ` 
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="background-color: #f0f0f0; padding: 8px">
    <center>
      <table
        style="
        background-color: rgb(21, 16, 43);
        padding-top: 32px;
          padding-bottom: 32px;
          width: 100% !important;
          max-width: 600px;
          margin-top: 8px;
        "
      >
        <tbody>
          <tr>
            <td>
              <center>
                <img
                  alt="logo heelpy"
                  style="max-width:250px; width: 100%"
                  src="https://storage-heelpy.s3.amazonaws.com/Captura+de+tela+de+2022-09-22+18-57-17.png"
                />
              </center>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        style="
          background-color: #fff;
          margin-top: 8px;
          width: 600px;
          border-width: 1px;
          border-color: #e9e7e6;
          border-style: solid;
          padding-top: 32px;
          padding-bottom: 32px;
          padding-left: 24px;
          padding-right: 24px;
        "
      >
        <tbody>
          <tr>
            <td
              style="
                text-align: justify;
                padding-top: 32px;
                padding-left: 24px;
                padding-right: 24px;
              "
            >
              <a href="https://web-healthy-mind.vercel.app">
                <img
                  alt="doutoramente"
                  src="https://staging-web-healthy-mind.vercel.app/mente-sa-logo.png"
                  width="45"
                  height="35"
                />
              </a>
              <p style="color: #69625c; font-family: Arial; font-size: 14px">
                Olá ${name}, seu código de acesso chegou!
              </p>
              <p style="text-align: justify; color: #69625c; font-family: Arial; font-size: 14px">
                ${name}, seja bem vindo(a) ao <b>"DoutoraMente"</b>, você foi cadastrado(a) no
                sistema por ${professionalName}. <br /><br />
                Para usar o sistema você precisa informar seu email: {email} e o
                <b>código temporário de acesso.</b> E não esqueça de cadastrar uma senha segura.
              </p>
            </td>
          </tr>
          <tr>
            <td
              style="
                padding-top: 32px;
                padding-bottom: 32px;
                padding-left: 24px;
                padding-right: 24px;
              "
            >
              <div
                style="
                  width: 151px;
                  background-color: #cc1a5c;
                  display: block;
                  color: #fff;
                  text-decoration: none;
                  padding-top: 11px;
                  padding-bottom: 11px;
                  text-align: center;
                  font-family: Arial;
                  margin-left: auto;
                  margin-right: auto;
                  font-size: 20px;
                "
              >
                <b>${code}</b>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table style="padding-top: 24px">
        <tbody>
          <tr>
            <td>
              <p style="text-align: center; color: #363636; font-family: Arial; font-size: 12px">
                <b>Importante: esta é uma mensagem automática e não deve ser respondida.</b>
              </p>
              <p style="text-align: center; color: #9b9b9b; font-family: Arial; font-size: 12px">
                Enviado por
                <a href="https://staging-web-healthy-mind.vercel.app" style="color: #9b9b9b"
                  >doutoramente.app</a
                >
              </p>
              <p style="text-align: center; color: #9b9b9b; font-family: Arial; font-size: 11px">
                © ${currentYear} DOUTORAMENTE
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p style="margin: 10px; text-align: center">
                <a
                  href="#self"
                  style="text-align: center; font-size: 12px; color: #666666; text-align: center"
                  >Para <b>cancelar sua inscrição</b>, clique aqui.</a
                >
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  </body>
</html>


 `;
};
