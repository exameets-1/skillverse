// lib/emailTemplates/registrationEmail.ts

interface TestCourse {
  title: string;
  questionsPerTest: number;
  durationMinutes: number;
}

interface RegistrationEmailData {
  studentName: string;
  registeredCourses: TestCourse[];
  referralCode: string;
}

export function getRegistrationEmailTemplate(data: RegistrationEmailData): string {
  const { studentName, registeredCourses, referralCode } = data;

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
        <title>Welcome to Exameets Skillverse - Registration Successful</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🎉 Welcome to Exameets Skillverse!</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Your Journey to Excellence Begins Now</p>
        </div>
        
        <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; background: linear-gradient(135deg, #4caf50 0%, #45a049 100%); color: white; padding: 15px 30px; border-radius: 50px; font-size: 18px; font-weight: bold;">
                    ✅ REGISTRATION SUCCESSFUL
                </div>
            </div>
            
            <p style="font-size: 16px; margin-bottom: 10px; color: #333;">Dear <strong>${studentName}</strong>,</p>
            
            <p style="font-size: 16px; margin-bottom: 20px; color: #555;">
                Congratulations! 🎊 You have successfully registered for <strong>Exameets Skillverse Talent Hunt - I</strong>
            </p>
            
            <div style="background: #e8f5e9; border-left: 4px solid #4caf50; padding: 20px; margin: 25px 0; border-radius: 4px;">
                <h3 style="color: #2e7d32; margin: 0 0 15px 0; font-size: 18px;">🚀 YOUR TEST IS NOW LIVE!</h3>
                <p style="margin: 0; color: #2e7d32; font-size: 16px;">
                    Great news! Your assessment is ready and waiting for you. You can start your test immediately by clicking the button below.
                </p>
            </div>
            
            <div style="border: 2px solid #667eea; border-radius: 8px; padding: 0; margin: 30px 0; overflow: hidden;">
                <div style="background: #667eea; padding: 15px; text-align: center;">
                    <h2 style="color: white; margin: 0; font-size: 20px;">📋 YOUR REGISTERED TESTS</h2>
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
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0;">
                <h3 style="color: white; margin: 0 0 15px 0; font-size: 20px;">🎯 START YOUR TEST NOW!</h3>
                <a href="https://skillverse.exameets.in/test/setup" style="display: inline-block; background: white; color: #667eea; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; margin-top: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">Click Here to Begin</a>
                <p style="color: #f0f0f0; margin: 15px 0 0 0; font-size: 14px;">or Visit: https://skillverse.exameets.in/test/setup</p>
            </div>
            
            <div style="background: #f0f4ff; border: 2px solid #667eea; border-radius: 8px; padding: 25px; margin: 30px 0; text-align: center;">
                <h3 style="color: #667eea; margin: 0 0 15px 0; font-size: 20px;">🎁 YOUR REFERRAL CODE</h3>
                <div style="background: white; display: inline-block; padding: 15px 30px; border-radius: 8px; border: 2px dashed #667eea; margin: 10px 0;">
                    <p style="margin: 0; color: #667eea; font-size: 24px; font-weight: bold; letter-spacing: 3px;">${referralCode}</p>
                </div>
                <p style="color: #555; margin: 15px 0 0 0; font-size: 14px;">
                    Share this code with friends and earn rewards when they register!
                </p>
            </div>
            
            <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 4px;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">⚡️ TEST GUIDELINES</h3>
                <ul style="margin: 0; padding-left: 20px; color: #555;">
                    <li style="margin-bottom: 8px;">Read each question carefully before answering</li>
                    <li style="margin-bottom: 8px;">Complete all questions within the allocated time</li>
                    <li style="margin-bottom: 8px;">Each question has only one correct answer</li>
                    <li style="margin-bottom: 8px;">No negative marking - attempt all questions</li>
                    <li style="margin-bottom: 0;">Results will be shared after evaluation</li>
                </ul>
            </div>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 25px 0; border-radius: 4px;">
                <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">⚠️ IMPORTANT INSTRUCTIONS</h3>
                <ul style="margin: 0; padding-left: 20px; color: #856404;">
                    <li style="margin-bottom: 8px;">Find a quiet, distraction-free environment</li>
                    <li style="margin-bottom: 8px;">Use a laptop or desktop for optimal experience</li>
                    <li style="margin-bottom: 8px;">Ensure stable internet connection throughout</li>
                    <li style="margin-bottom: 8px;">Do not close browser or refresh during the test</li>
                    <li style="margin-bottom: 8px;">Do not use external resources or assistance</li>
                    <li style="margin-bottom: 0;">Submit before the timer expires to save your answers</li>
                </ul>
            </div>
            
            <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; margin: 25px 0; border-radius: 4px;">
                <h3 style="color: #1976d2; margin: 0 0 15px 0; font-size: 18px;">🌟 WHAT HAPPENS NEXT?</h3>
                <p style="margin: 0 0 10px 0; color: #1976d2;">
                    After completing your test:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #1976d2;">
                    <li style="margin-bottom: 8px;">Your performance will be evaluated by our expert team</li>
                    <li style="margin-bottom: 8px;">You'll receive personalized course recommendations</li>
                    <li style="margin-bottom: 8px;">Get access to exclusive learning resources</li>
                    <li style="margin-bottom: 0;">Join our community of skilled professionals</li>
                </ul>
            </div>
            
            <div style="background: #ffebee; border: 2px dashed #f44336; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
                <p style="margin: 0; color: #c62828; font-size: 16px; font-weight: bold;">
                    ⏰ Complete your test on or before <strong>9th November</strong> to secure your spot in the rankings!
                </p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Need Help? We're Here!</h3>
                <p style="margin: 5px 0; color: #555;">📧 Email: <a href="mailto:management@exameets.com" style="color: #667eea; text-decoration: none;">management@exameets.com</a></p>
                <p style="margin: 5px 0; color: #555;">📞 Phone: <a href="tel:6302189118" style="color: #667eea; text-decoration: none;">6302189118</a></p>
                <p style="margin: 5px 0; color: #555;">💬 WhatsApp: <a href="https://wa.me/6302189118" style="color: #667eea; text-decoration: none;">6302189118</a></p>
            </div>
            
            <hr style="border: none; border-top: 2px solid #eee; margin: 30px 0;">
            
            <p style="font-size: 16px; color: #333; margin-bottom: 10px;">
                We're thrilled to have you on board! Best of luck with your test! 🌟
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