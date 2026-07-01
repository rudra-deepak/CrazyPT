import os
import random
from dotenv import load_dotenv
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

load_dotenv()

api_key = os.getenv("BREVO_API_KEY")


def generate_otp():
    return str(random.randint(100000, 999999))


def send_email(receiver_email, subject, message):

    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key["api-key"] = api_key

    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
        sib_api_v3_sdk.ApiClient(configuration)
    )

    sender = {
        "name": "CrazyPT",
        "email": "rudra763.org.in@gmail.com"
    }

    receiver = [
        {
            "email": receiver_email
        }
    ]

    email = sib_api_v3_sdk.SendSmtpEmail(
        to=receiver,
        sender=sender,
        subject=subject,
        html_content=message
    )

    try:
        api_instance.send_transac_email(email)
        print("Email Sent Successfully!")

    except ApiException as e:
        print("Error:", e)


# def send_otp(receiver_email, otp):

#     subject = "CrazyPT Email Verification"

#     message = f"""
#     <h2>Welcome to CrazyPT 🎉</h2>

#     <p>Your verification code is:</p>

#     <h1 style="color:#8b5cf6;">{otp}</h1>

#     <p>This OTP is valid for 5 minutes.</p>

#     <p>If you didn't request this, please ignore this email.</p>

#     <p> Thank You💖</p>
#     <p> Rudra Deepak</p>
#     <p> Team CrazyPT </p>
#     """

#     send_email(receiver_email, subject, message)

def send_otp(receiver_email, otp):

    print("send_otp() called")
    print("Receiver:", receiver_email)
    print("OTP:", otp)

    subject = "CrazyPT Email Verification"

    message = f"""
    <h2>Welcome to CrazyPT 🎉</h2>

    <p>Your verification code is:</p>

    <h1 style="color:#8b5cf6;">{otp}</h1>

    <p>This OTP is valid for 5 minutes.</p>
    <p> Thank You💖</p>
    <p> Rudra Deepak</p>
    <p> Team CrazyPT </p>
    """

    send_email(receiver_email, subject, message)