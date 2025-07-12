

export const store_activation_template = (data: { 
  first_name: string;
  store_name: string;
  store_id: string;
}) => {
  return `<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0;">
    <meta name="format-detection" content="telephone=no" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet">

    <style>
        body {
            margin: 0;
            padding: 0;
            min-width: 100%;
            width: 100% !important;
            height: 100% !important;
            font-family: "Nunito", sans-serif;
            background-color: #f0f0f0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }

        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
        }

        .content {
            padding: 40px 30px;
            color: #374151;
            line-height: 1.6;
        }

        .success-icon {
            text-align: center;
            font-size: 48px;
            margin-bottom: 20px;
        }

        .store-details {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }

        .store-name {
            font-size: 20px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 10px;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
        }

        .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #6b7280;
            text-decoration: none;
        }
    </style>

    <title>Store Activated - Welcome to Bitshub!</title>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Store Activated!</h1>
            <p>Your store is now live on Bitshub</p>
        </div>

        <div class="content">
            <div class="success-icon">✅</div>
            
            <h2>Congratulations, ${data.first_name}!</h2>
            
            <p>Great news! Your store <strong>"${data.store_name}"</strong> has been reviewed and activated by our team. Your store is now live and ready to start selling!</p>
            
            <div class="store-details">
                <div class="store-name">${data.store_name}</div>
                <p><strong>Store ID:</strong> ${data.store_id}</p>
                <p><strong>Status:</strong> <span style="color: #059669; font-weight: 600;">ACTIVE</span></p>
            </div>

            <h3>What's Next?</h3>
            <ul>
                <li>📦 Start adding products to your store</li>
                <li>🎨 Customize your store appearance</li>
                <li>📊 Monitor your sales and analytics</li>
                <li>💬 Engage with your customers</li>
            </ul>

            <div style="text-align: center;">
                <a href="https://bitshub.co/dashboard" class="cta-button">
                    Go to Your Dashboard
                </a>
            </div>

            <p><strong>Need Help?</strong> Our support team is here to help you get started. Contact us at <a href="mailto:support@bitshub.co">support@bitshub.co</a></p>
        </div>

        <div class="footer">
            <p>Thank you for choosing Bitshub!</p>
            <div class="social-links">
                <a href="https://twitter.com/bitshub">Twitter</a>
                <a href="https://facebook.com/bitshub">Facebook</a>
                <a href="https://instagram.com/bitshub">Instagram</a>
            </div>
            <p>© 2025 Bitshub. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};