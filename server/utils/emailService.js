import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false  // ✅ Accept self-signed certificate
  }
});

// Send email to admin when new tender request is received
export const sendTenderRequestEmailToAdmin = async (tenderRequest) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Tender Request Received',
      html: `
        <h2>New Tender Request</h2>
        <p>A new tender request has been submitted by ${tenderRequest.companyName}.</p>
        
        <h3>Request Details:</h3>
        <ul>
          <li><strong>Company:</strong> ${tenderRequest.companyName}</li>
          <li><strong>Contact Person:</strong> ${tenderRequest.contactPerson}</li>
          <li><strong>Email:</strong> ${tenderRequest.email}</li>
          <li><strong>Phone:</strong> ${tenderRequest.phone}</li>
          <li><strong>Project Type:</strong> ${tenderRequest.projectType}</li>
          <li><strong>Location:</strong> ${tenderRequest.projectLocation}</li>
          <li><strong>Budget:</strong> ${tenderRequest.estimatedBudget}</li>
          <li><strong>Timeline:</strong> ${tenderRequest.preferredTimeline}</li>
        </ul>
        
        <h3>Project Description:</h3>
        <p>${tenderRequest.projectDescription}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("ADMIN EMAIL:", process.env.ADMIN_EMAIL);  // Must show a valid email

    console.log('Admin notification email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return false;
  }
};

// Send confirmation email to customer for tender request
export const sendTenderRequestEmailToCustomer = async (tenderRequest) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: tenderRequest.email,
      subject: 'Your Tender Request Has Been Received',
      html: `
        <h2>Thank You for Your Tender Request</h2>
        <p>Dear ${tenderRequest.contactPerson},</p>
        
        <p>We have received your tender request for ${tenderRequest.projectType} in ${tenderRequest.projectLocation}.</p>
        
        <h3>What Happens Next?</h3>
        <p>Our team will review your requirements and get back to you within 2 business days. Here's what you can expect:</p>
        
        <ol>
          <li><strong>Review:</strong> Our team will review your project requirements within 2 business days.</li>
          <li><strong>Consultation:</strong> We'll schedule a consultation to discuss your project in detail.</li>
          <li><strong>Proposal:</strong> You'll receive a detailed proposal with timeline and cost estimates.</li>
        </ol>
        
        <p>If you have any questions in the meantime, please feel free to contact us at jananiappachi0@gmail.com or call us at +91 8148170052.</p>
        
        <p>Best regards,<br>
        The Dhiya Infrastructure Team</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Customer confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending customer confirmation email:', error);
    return false;
  }
};

// Send email to admin for new contact form submission
export const sendContactEmailToAdmin = async (contactData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p>A new contact form has been submitted.</p>
        
        <h3>Contact Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${contactData.name}</li>
          <li><strong>Email:</strong> ${contactData.email}</li>
          <li><strong>Phone:</strong> ${contactData.phone}</li>
          <li><strong>Subject:</strong> ${contactData.subject}</li>
        </ul>
        
        <h3>Message:</h3>
        <p>${contactData.message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Admin contact notification email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending admin contact notification email:', error);
    return false;
  }
};

// Send confirmation email to customer for contact form
export const sendContactEmailToCustomer = async (contactData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: contactData.email,
      subject: 'Thank You for Contacting Dhiya Infrastructure',
      html: `
        <h2>Thank You for Contacting Us</h2>
        <p>Dear ${contactData.name},</p>
        
        <p>We have received your message and appreciate you taking the time to contact us.</p>
        
        <p>Our team will review your message and get back to you within 1-2 business days.</p>
        
        <p>For urgent matters, please feel free to call us at +91 8148170052.</p>
        
        <p>Best regards,<br>
        The Dhiya Infrastructure Team</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Customer contact confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending customer contact confirmation email:', error);
    return false;
  }
};