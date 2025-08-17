const config = require("../../config");

class MailTemplateService {
  static verificationCodeTemplate(randomCode) {
    const template = `Your verification code is <strong>${randomCode}</strong>`;
    return template;
  }

  static changePasswordTemplate(token, isBusiness) {
    const domain =
      config.env == "development"
        ? "http://localhost:4200"
        : "https://backend.com";
    const template = `Use this link to change your password <a href="${domain}/en/password/${token}?isBusiness=${isBusiness}">${domain}/en/password/${token}?isBusiness=${isBusiness}</a>`;
    return template;
  }

  static newsletterTemplate(subject, content) {
    const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
            }
            
            .newsletter-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            
            .header {
                background: linear-gradient(135deg, #8B5A96 0%, #FF8C42 100%);
                padding: 30px 20px;
                text-align: center;
                color: white;
            }
            
            .logo-section {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
            }
            
            .logo-circle {
                width: 80px;
                height: 80px;
                border: 3px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: white;
                margin-right: 15px;
            }
            
            .logo-s {
                font-size: 36px;
                font-weight: bold;
                background: linear-gradient(135deg, #FF8C42 0%, #8B5A96 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .company-name {
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 2px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            
            .tagline {
                font-size: 14px;
                opacity: 0.9;
                margin-top: 5px;
            }
            
            .content-section {
                padding: 40px 30px;
            }
            
            .subject-line {
                font-size: 24px;
                color: #8B5A96;
                margin-bottom: 20px;
                text-align: center;
                border-bottom: 2px solid #FF8C42;
                padding-bottom: 10px;
            }
            
            .content-body {
                font-size: 16px;
                line-height: 1.8;
                color: #555;
                margin-bottom: 30px;
            }
            
            .highlight-box {
                background: linear-gradient(135deg, rgba(139, 90, 150, 0.1) 0%, rgba(255, 140, 66, 0.1) 100%);
                border-left: 4px solid #8B5A96;
                padding: 20px;
                margin: 20px 0;
                border-radius: 0 8px 8px 0;
            }
            
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #8B5A96 0%, #FF8C42 100%);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 25px;
                font-weight: bold;
                text-align: center;
                margin: 20px 0;
                transition: transform 0.3s ease;
            }
            
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(139, 90, 150, 0.4);
            }
            
            .footer {
                background-color: #2c2c2c;
                color: white;
                padding: 30px 20px;
                text-align: center;
            }
            
            .footer-logo {
                width: 50px;
                height: 50px;
                border: 2px solid white;
                border-radius: 50%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background: white;
                margin-bottom: 15px;
            }
            
            .footer-logo .logo-s {
                font-size: 24px;
            }
            
            .footer-text {
                font-size: 14px;
                opacity: 0.8;
                margin-bottom: 10px;
            }
            
            .social-links {
                margin: 20px 0;
            }
            
            .social-links a {
                color: #FF8C42;
                text-decoration: none;
                margin: 0 10px;
                font-size: 14px;
            }
            
            .unsubscribe {
                font-size: 12px;
                opacity: 0.6;
                margin-top: 20px;
            }
            
            .unsubscribe a {
                color: #FF8C42;
                text-decoration: none;
            }
            
            @media (max-width: 600px) {
                .newsletter-container {
                    margin: 0;
                    box-shadow: none;
                }
                
                .header {
                    padding: 20px 15px;
                }
                
                .logo-section {
                    flex-direction: column;
                }
                
                .logo-circle {
                    margin-right: 0;
                    margin-bottom: 15px;
                }
                
                .company-name {
                    font-size: 24px;
                }
                
                .content-section {
                    padding: 30px 20px;
                }
                
                .subject-line {
                    font-size: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="newsletter-container">
            <div class="header">
                <div class="logo-section">
                    <div class="logo-circle">
                        <div class="logo-s">S</div>
                    </div>
                    <div>
                        <div class="company-name">STRATEGIZERS</div>
                        <div class="tagline">Strategic Solutions for Success</div>
                    </div>
                </div>
            </div>
            
            <div class="content-section">
                <h1 class="subject-line">${subject}</h1>
                
                <div class="content-body">
                    ${content}
                </div>
                
                <div class="highlight-box">
                    <strong>Strategic Insight:</strong> Success in today's competitive landscape requires innovative thinking and strategic planning. Let us help you navigate your path to excellence.
                </div>
                
                <center>
                    <a href="#" class="cta-button">Discover Our Solutions</a>
                </center>
            </div>
            
            <div class="footer">
                <div class="footer-logo">
                    <div class="logo-s">S</div>
                </div>
                
                <div class="footer-text">
                    <strong>STRATEGIZERS</strong><br>
                    Your Partner in Strategic Excellence
                </div>
                
                <div class="social-links">
                    <a href="#">Website</a> |
                    <a href="#">LinkedIn</a> |
                    <a href="#">Twitter</a> |
                    <a href="#">Contact</a>
                </div>
                
                <div class="footer-text">
                    123 Strategy Street, Business District<br>
                    City, State 12345 | Phone: (555) 123-4567
                </div>
                
                <div class="unsubscribe">
                    <a href="#">Unsubscribe</a> | <a href="#">Update Preferences</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    return template;
  }
}

module.exports = MailTemplateService;
