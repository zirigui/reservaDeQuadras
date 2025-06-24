import emailjs from '@emailjs/browser';

export const sendReservationEmail = async (
  name: string,
  email: string,
  courtName: string,
  date: string,
  time: string
) => {
  try {
    const result = await emailjs.send(
      'gmailmessage',
      'template_15v08bn',
      {
        user_name: name,
        user_email: email,
        court_name: courtName,
        reservation_date: date,
        reservation_hour: time,
      },
      'NRIUgF5IYN9AjsDAC' // public key do EmailJS
    );
    console.log('Email enviado:', result.text);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
};
