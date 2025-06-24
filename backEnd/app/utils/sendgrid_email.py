import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

SENDGRID_API_KEY = "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"

def send_reservation_email(to_email: str, user_name: str, horario: str, quadra: str):
    subject = "Confirmação de Reserva"
    html_content = f"""
    <p>Olá {user_name},</p>
    <p>Sua reserva foi confirmada para a quadra <strong>{quadra}</strong> no horário <strong>{horario}</strong>.</p>
    <p>Obrigado por utilizar nosso sistema!</p>
    """

    message = Mail(
        from_email="reservadequadras12@gmail.com",
        to_emails=to_email,
        subject=subject,
        html_content=html_content
    )

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)
    except Exception as e:
        print("Erro ao enviar e-mail:", e)
