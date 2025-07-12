export const admin_store_creation_template = (data: { 
  first_name: string;
  store_name: string;
  user_email: string;
  store_description: string;
  phone_number?: string;
  state?: string;
  city?: string;
  street?: string;
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
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #1f2937;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }

        .content {
            padding: 30px;
            color: #374151;
        }

        .store-info {
            background-color: #f3f4f6;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }

        .info-label {
            font-weight: bold;
            color: #6b7280;
        }

        .info-value {
            color: #374151;
        }

        .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            color: #6b7280;
        }

        .button {
            display: inline-block;
            background-color: #3b82f6;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 0;
        }
    </style>

    <title>New Store Application - Admin Notification</title>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>🛍️ New Store Application</h1>
            <p>A new store has been created and requires review</p>
        </div>

        <div class="content">
            <h2>Store Details</h2>
            
            <div class="store-info">
                <div class="info-row">
                    <span class="info-label">Store Name:</span>
                    <span class="info-value">${data.store_name}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Owner Name:</span>
                    <span class="info-value">${data.first_name}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Owner Email:</span>
                    <span class="info-value">${data.user_email}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Phone Number:</span>
                    <span class="info-value">${data.phone_number || 'Not provided'}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Location:</span>
                    <span class="info-value">${data.state || ''} ${data.city || ''} ${data.street || ''}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Description:</span>
                    <span class="info-value">${data.store_description}</span>
                </div>
            </div>

            <p><strong>Action Required:</strong> Please review this store application and activate it if it meets our guidelines.</p>
            
            <p>You can access the admin panel to review and manage this store application.</p>
        </div>

        <div class="footer">
            <p>This is an automated notification from Bitshub Platform</p>
            <p>© 2025 Bitshub. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
}; 