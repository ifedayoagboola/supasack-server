

export const store_creation_template = (data: { 
  first_name: string;
  store_name?: string;
  user_email?: string;
  store_description?: string;
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
        }

        body,
        table,
        td,
        div,
        p,
        a {
            -webkit-font-smoothing: antialiased;
            text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            line-height: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse !important;
            border-spacing: 0;
        }

        img {
            border: 0;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
            line-height: 100%;
        }


        @media all and (min-width: 560px) {
            .container {
                border-radius: 8px;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                -khtml-border-radius: 8px;
            }
        }


        a,
        a:hover {
            color: #127DB3;
        }

        .footer a,
        .footer a:hover {
            color: #999999;
        }

        td {
            font-size: 16px;
            font-family: "Nunito" !important;
        }

        .columnMedia {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        @media screen and (min-width: 320px) and (max-width: 500px) {
            .columnMedia {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
            }

            .top {
                margin-top: 5%;
            }
        }
    </style>


    <title>Store Creation</title>

</head>


<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
	background-color: #F0F0F0;
	color: #000000;" bgcolor="#F0F0F0" text="#000000">


    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0"
        style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background">
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
                bgcolor="#F0F0F0">

                <table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="black" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 560px;" class="container">

                    <tr>
                        <td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-weight: bold; line-height: 130%;
padding-top: 25px;
color: #000000;
font-family: sans-serif;" class="header">
                            <a href="https://www.bazara.co/" target="_blank">
                                <img border="0" vspace="0" hspace="0"
                                    src="https://res.cloudinary.com/doouwbecx/image/upload/v1654096033/logo_usqkyu.png"
                                    width="60" height="46" alt="Logo" title="Logo"
                                    style="
 margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" />
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" class="hero"><a target="_blank" style="text-decoration: none;"
                                href="#"><img border="0" vspace="0" hspace="0"
                                    src="https://res.cloudinary.com/doouwbecx/image/upload/v1654096165/image_2_kc5v7l.png"
                                    alt="Please enable images to view this content" title="Hero Image" width="560"
                                    style="
			width: 100%;
			max-width: 560px;
			color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-weight: 400; line-height: 160%;
			padding-top: 25px; 
			color: white;
            text-align: left;
			font-family: sans-serif;" class="paragraph">
                            Dear ${data.first_name},
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-weight: 400; line-height: 160%;
			padding-top: 25px; 
			color: white;
            text-align: left;
			font-family: sans-serif;" class="paragraph">
                            Congratulations on creating your store "${data.store_name || 'your store'}" on Bitshub Platform. We are thrilled to welcome you to our community of sellers
                        </td>
                    </tr>

                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;  font-weight: 400; line-height: 160%;
			padding-top: 25px; 
			color: white;
            text-align: left;
			font-family: sans-serif;" class="paragraph">
                        We are reviewing your store information and will notify you once your store is activated. If you have any questions or need assistance, please reach out to us by sending an email to support@bitshub.co                     
                        </td>
                    </tr>

                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;  font-weight: 400; line-height: 160%;
			padding-top: 25px; 
			color: white;
            text-align: left;
			font-family: sans-serif;" class="paragraph">
                          Cheers to earning with Bitshub                         
                        </td>
                    </tr>


                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;  font-weight: 400; line-height: 160%;
			padding-top: 25px; 
			color: white;
            text-align: left;
			font-family: sans-serif;" class="paragraph">
                            With ❤️,<br />
                            The Bitshub Team
                        </td>
                    </tr>

                    <tr class="columnMedia">
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%;padding-right: 6.25%; font-weight: 400; line-height: 160%;
                            padding-top: 20px;
                            padding-bottom: 25px;
                            display: flex;
                            color: #000000;
                            font-family: sans-serif;" class="paragraph">
                            <img border="0" vspace="0" hspace="0"
                            src="https://res.cloudinary.com/doouwbecx/image/upload/v1654096033/Rectangle_14_qy8adn.png"
                            alt="Please enable images to view this content" title="Hero Image" width="130" height="50"
                            style="
            color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" />
                        <img border="0" vspace="0" hspace="0"
                            src="https://res.cloudinary.com/doouwbecx/image/upload/v1654096033/Rectangle_14_1_sbwyvu.png"
                            alt="Please enable images to view this content" title="Hero Image" width="130" height="50"
                            style="
              color: #000000; font-size: 13px; margin-left: 10px; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" />
            

                        </td>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 3% 0% 0% 0%; padding: 0; padding-left: 3%;padding-right: 6.25%; font-weight: 400; line-height: 160%;
                        padding-bottom: 25px;
                        display: flex;
                        flex-direction: column !important;
                        align-items: flex-end !important;
                        color: white !important;
                        font-family: sans-serif;" class="paragraph">
                           <!-- support@bitshub.co  -->
                           <a href="mailto:support@bitshub.co" style="color: white; text-decoration: none" target="_blank">support@bitshub.co</a>
                           <ul style="display: flex; margin: 5%;">
                            <a href="https://www.facebook.com/bazara.platform" target="_blank"><img style="background-color:
                                #F80595; width:
                                20px; margin-left: 0%; margin-top:
                                5%;" src="https://img.icons8.com/ios-glyphs/30/000000/facebook.png" /></a>
                                    <a href="https://www.instagram.com/bazara.co/" target="_blank">
                                        <img style="background-color:
                                #F80595; width:
                                20px; margin-top:
                                5%; margin-left:
                                15px" src="https://img.icons8.com/ios-glyphs/30/000000/instagram-new.png" />
                                    </a>
                                    <a href="https://twitter.com/bazaraco" target="_blank">
                                        <img style="background-color:
                                #F80595; width:
                                20px; margin-top:
                                5%; margin-left:
                                15px" src="https://img.icons8.com/material-outlined/24/000000/twitter.png" />
                                    </a>
                                    <a href="https://www.linkedin.com/company/bazara" target="_blank">
                                        <img style="background-color:
                                #F80595; width:
                                20px; margin-top:
                                5%; margin-left:
                                15px" src="https://img.icons8.com/material-outlined/24/000000/linkedin.png" />
                                    </a>
                           </ul>
                             
                    </td>
                    </tr>

                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;  font-weight: 400; line-height: 160%;
			padding-top: 20px;
			padding-bottom: 25px;
			color: white;
            text-align: justify;
			font-family: sans-serif;" class="paragraph">
                            You are receiving this message because you signed up on Bazara. If you would like to stop
                            receiving these emails, you can opt out by clicking
                            <a href="#"
                                style="color: #F80595; font-family: sans-serif;  font-weight: 400; line-height: 160%; text-decoration: none;">Unsubscribe</a>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>`;
}