// lib/emailTemplates/testNotification.ts

interface TestCourse {
  title: string;
  questionsPerTest: number;
  durationMinutes: number;
}

interface EmailData {
  studentName: string;
  registeredCourses: TestCourse[];
}

export function getTestNotificationTemplate(data: EmailData): string {
  const { studentName, registeredCourses } = data;

  // Generate table rows for each test course
  const testCoursesRows = registeredCourses.map((course, index) => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 15px; text-align: center; font-weight: bold; color: #667eea;">${index + 1}</td>
      <td style="padding: 15px; color: #333;">${course.title}</td>
      <td style="padding: 15px; text-align: center; color: #555;">${course.questionsPerTest}</td>
      <td style="padding: 15px; text-align: center; color: #555;">${course.durationMinutes} mins</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Test is Now LIVE - Exameets Skillverse</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Exameets Skillverse</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Your Learning Journey Starts Here</p>
        </div>
        
        <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="font-size: 16px; margin-bottom: 10px; color: #333;">Dear <strong>${studentName}</strong>,</p>
            
            <p style="font-size: 16px; margin-bottom: 20px; color: #555;">
                Congratulations on registering for our <strong>Exameets Skillverse Talent Hunt - I</strong>
            </p>
            
            <p style="font-size: 16px; margin-bottom: 25px; color: #555;">
                We're excited to inform you that your test is now <strong style="color: #667eea;">LIVE</strong> and ready to take.
            </p>
            
            <div style="border: 2px solid #667eea; border-radius: 8px; padding: 0; margin: 30px 0; overflow: hidden;">
                <div style="background: #667eea; padding: 15px; text-align: center;">
                    <h2 style="color: white; margin: 0; font-size: 20px;">📋 TEST DETAILS</h2>
                </div>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f8f9fa;">
                            <th style="padding: 15px; text-align: center; border-bottom: 2px solid #667eea; color: #667eea;">#</th>
                            <th style="padding: 15px; text-align: left; border-bottom: 2px solid #667eea; color: #667eea;">Test Name</th>
                            <th style="padding: 15px; text-align: center; border-bottom: 2px solid #667eea; color: #667eea;">Questions</th>
                            <th style="padding: 15px; text-align: center; border-bottom: 2px solid #667eea; color: #667eea;">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${testCoursesRows}
                    </tbody>
                </table>
            </div>
            
            <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 4px;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">⚡️ QUICK TIPS</h3>
                <ul style="margin: 0; padding-left: 20px; color: #555;">
                    <li style="margin-bottom: 8px;">Read each question carefully</li>
                    <li style="margin-bottom: 8px;">Answer all questions within the test duration</li>
                    <li style="margin-bottom: 8px;">Single correct answer per question</li>
                    <li style="margin-bottom: 0;">No negative marking</li>
                </ul>
            </div>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0;">
                <h3 style="color: white; margin: 0 0 15px 0; font-size: 20px;">🚀 READY TO START?</h3>
                <a href="https://skillverse.exameets.in/test/setup" style="display: inline-block; background: white; color: #667eea; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; margin-top: 10px;">Click Here to Start Test</a>
                <p style="color: #f0f0f0; margin: 15px 0 0 0; font-size: 14px;">or Visit: https://skillverse.exameets.in/test/setup</p>
            </div>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 25px 0; border-radius: 4px;">
                <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">❓ IMPORTANT REMINDERS</h3>
                <ul style="margin: 0; padding-left: 20px; color: #856404;">
                    <li style="margin-bottom: 8px;">Take the test in a quiet environment</li>
                    <li style="margin-bottom: 8px;">Use a laptop or desktop for best experience</li>
                    <li style="margin-bottom: 8px;">Ensure stable internet connection</li>
                    <li style="margin-bottom: 8px;">Do not close browser or refresh during test</li>
                    <li style="margin-bottom: 0;">Do not use external resources during assessment</li>
                </ul>
            </div>
            
            <div style="background: #e8f5e9; border-left: 4px solid #4caf50; padding: 20px; margin: 25px 0; border-radius: 4px;">
                <h3 style="color: #2e7d32; margin: 0 0 15px 0; font-size: 18px;">🎁 WHAT'S NEXT?</h3>
                <p style="margin: 0; color: #2e7d32;">
                    Based on your test performance, you'll receive exclusive recommendations for specialized courses tailored to your skill level. We're here to help you advance your tech career!
                </p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Questions? Contact us:</h3>
                <p style="margin: 5px 0; color: #555;">📧 Email: <a href="mailto:management@exameets.com" style="color: #667eea; text-decoration: none;">management@exameets.com</a></p>
                <p style="margin: 5px 0; color: #555;">📞 Phone: <a href="tel:6302189118" style="color: #667eea; text-decoration: none;">6302189118</a></p>
                <p style="margin: 5px 0; color: #555;">💬 WhatsApp: <a href="https://wa.me/6302189118" style="color: #667eea; text-decoration: none;">6302189118</a></p>
            </div>
            
            <div style="background: #ffebee; border: 2px dashed #f44336; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
                <p style="margin: 0; color: #c62828; font-size: 16px; font-weight: bold;">
                    ⏰ Complete your test on or before <strong>9th November</strong> to ensure your spot in our performance rankings!
                </p>
            </div>
            
            <hr style="border: none; border-top: 2px solid #eee; margin: 30px 0;">
            
            <p style="font-size: 16px; color: #333; margin-bottom: 10px;">
                Best of luck! We're rooting for you! 🌟
            </p>
            
            <p style="font-size: 16px; color: #555; margin-bottom: 5px;">
                Warm regards,<br>
                <strong>Team Exameets Skillverse Academy</strong>
            </p>
            
            <p style="font-size: 14px; color: #888; font-style: italic; margin-bottom: 20px;">
                Empowering Tech Learners Worldwide
            </p>
            
            <div style="text-align: center; margin-top: 20px;">
                <a href="https://www.instagram.com/exameets.skillverse/" style="display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none;">Instagram</a>
                <span style="color: #ccc;">|</span>
                <a href="https://chat.whatsapp.com/Jcvi1ScKimw4D6QHwB8bJl" style="display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none;">WhatsApp Community</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <div style="text-align: center; color: #888; font-size: 12px;">
                <p style="margin: 5px 0;">© 2025 Exameets Skillverse. All rights reserved.</p>
                <p style="margin: 5px 0;">Empowering students with quality education and skill development.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}