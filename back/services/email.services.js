const nodemailer = require("nodemailer");

class EmailServices {
  static async sendEmail(userEmail) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "proyecto3d.p5@gmail.com",
          pass: "yqzphfcrvdujpwvk",
        },
      });

      const mailOptions = {
        from: "proyecto3d.p5@gmail.com",
        to: userEmail,
        subject: "Proyecto 3d -Comprobante de compra",
        text: "Su compra ha sido realizada satifactoriamente.",
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Correo electrónico enviado: " + info.response);

      return "Correo electrónico enviado";
    } catch (error) {
      console.log(error);
      throw new Error("Error al enviar el correo electrónico");
    }
  }
}

module.exports = EmailServices;
