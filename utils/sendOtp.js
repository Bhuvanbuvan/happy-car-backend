const nodeMailer = require('nodemailer');

const sendOtpMail = async (Mail, otp) => {
    try {
        console.log("📧 Recipient Email:", Mail);

        if (!Mail || Mail.trim() === "") {
            throw new Error("Recipient email is missing.");
        }

        let transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: "bhuvaneshw522@gmail.com",
                pass: "nenq lerq cpnw vluh" // Use an App Password
            }
        },);

        let mailOptions = {
            from: "bhuvaneshw522@gmail.com",
            to: Mail,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent: " + info.response);
        return { success: true, message: "OTP sent successfully" };
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return { success: false, message: "Failed to send OTP" };
    }
};

// Export the function
module.exports = sendOtpMail;
