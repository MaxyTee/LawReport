import { transporter } from "./mail.config.js";
import dotenv from "dotenv";
import { response } from "express";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  FORGOT_PASSWORD_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

dotenv.config();

export const sendVerificationEmail = async (email, verificationToken, name) => {
  const recipient = email;
  try {
    const mailOptions = {
      from: `BUKLawReport <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE({ verificationToken, name }),
      category: "Email Verification",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(`Error Sending verification email: ${error}`);
    throw new Error(`Error Sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = email;
  try {
    const mailOptions = {
      from: `BUKLawReport <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: "Welcome Message",
      html: WELCOME_EMAIL_TEMPLATE({ name }),
      category: "Welcome Verification",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    console.log(`Error Sending welcome email: ${error}`);
    throw new Error(`Error Sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, name, ressetToken) => {
  const recipient = email;
  try {
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${ressetToken}`;
    const mailOptions = {
      from: `BUKLawReport <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: "Reset Your Password BUKLawReport",
      html: FORGOT_PASSWORD_EMAIL_TEMPLATE({ resetURL, email, name }),
      category: "Password Reset",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    console.log("Reset email sent successfully", response);
  } catch (error) {
    console.log(`Error Sending password reset email: ${error}`);
    throw new Error(`Error Sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (
  email,
  name,
  timestamp = new Date()
) => {
  const recipient = email;
  try {
    const mailOptions = {
      from: `BUKLawReport <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: "Reset Your Password BUKLawReport",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE({ email, name, timestamp }),
      category: "Password Reset",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.log("Error sending password reset success email", error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
