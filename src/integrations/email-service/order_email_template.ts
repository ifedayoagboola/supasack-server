import { OrderEmailData } from "@src/interfaces/order";


export const orderEmailNotification = (data: OrderEmailData) => {
  return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300&display=swap"
            rel="stylesheet">


        <style>
         body {
            background-color: #F0F0F0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }

        .container {
            background-color: black;
            width: 30rem;
            padding: 10px;
        }
        td {
            color: white;
            font-family: Nunito;
        }
        th {
            color: #F80595;
            font-family: Nunito;
            text-align: left;
        }
    </style>
    </head>
    <body>
        <!-- Header -->
        <table class="container">
            <tr style="display: flex; justify-content: space-between;">
                <td>
                    <img
                        src="https://res.cloudinary.com/doouwbecx/image/upload/v1632218939/p_1_sapsrt.png"
                        alt="template-logo" />
                </td>
                <td style="display: flex; flex-direction: column; align-items:
                    flex-end; justify-content: center;">
                    <span>Order ID</span>
                    <span>395787417</span>
                </td>
            </td>
        </tr>
        <tr><td></td></tr>
        <tr><td></td></tr>
        <tr><td></td></tr>
        <tr><td></td></tr>
        <tr><td></td></tr>
        <tr><td></td></tr>
        <tr><td></td></tr>
        <tr><td></td></tr>
        <tr>
            <td style="border-top: 1px solid #454444;">  
                </td>
            </tr>
        </table>
        <table class="container">
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr><td></td></tr>

            <tr>
                <td>
                    Hello ${data.profile_name}
                </td>
            </tr>
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr>
                <td>
                    Thank you for shopping on Bazara! Your order has been
                    <b>${data.order_status.toLowerCase()}</b> successfully.
                </td>
            </tr>
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr>
                <td>
                    Here is a quick summary of your order:
                </td>
            </tr>
        </table>
        <table class="container">
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr>
                <th style="width: 60%;border-top: 1px solid #454444; padding: 10px">
                    ITEMS
                </th>
                <th style="width: 25%; border-top: 1px solid #454444; padding: 10px">
                    QUANTITY
                </th>
                <th style="width: 25;border-top: 1px solid #454444; padding: 10px">
                    PRICE
                </th>
                <tbody>
                    <tr>
                        <td style="display: flex; align-items: center; width:50px; height:50px; border-radius:10px;  border-top: 1px solid #454444; padding: 10px">
                            <img src=${data.img_url} />
                            <span></span>
                            <span style="margin-left: 2%;">${data.product_name}</span>
                        </td>
                        <td style="border-top: 1px solid #454444; text-align: center;">${data.quantity}</td>
                        <td style="border-top: 1px solid #454444;">₦${data.price}</td>
                    </tr>
                </tbody>
            </tr>
           
        </table>
        <table class="container">
            <tr>
                <td style="border-bottom: 1px solid #454444;"></td>
            </tr>
        </table>
        <table class="container">
            <tr>
                <td style="line-height: 24px; font-family: Nunito;"> With ❣️ from<br />
                    The Bazara Team</td>
            </tr>
        </table>
        <table class="container">
            <tr style="display: flex; justify-content: space-between;padding: 5px 0px;">
                <td>
                    <img style="width: 120px;" src="https://res.cloudinary.com/doouwbecx/image/upload/v1632224657/Rectangle_14_rj3in6.png" />
                    <img style="width: 120px;" src="https://res.cloudinary.com/doouwbecx/image/upload/v1632224657/Rectangle_14_1_o76fvm.png" />
                </td>
                <td style="color: white; padding: 0% 30px; font-family: Nunito;">
                    support@bazara.co<br />
                    <span class="social-icons">
                        <img style="background-color: #F80595; width: 20px;;"
                            src="https://img.icons8.com/ios-glyphs/30/000000/facebook.png" />
                        <img style="background-color: #F80595; width: 20px;"
                            src="https://img.icons8.com/ios-glyphs/30/000000/instagram-new.png" />
                        <img style="background-color: #F80595; width: 20px;"
                            src="https://img.icons8.com/material-outlined/24/000000/twitter.png" />
                        <img style="background-color: #F80595; width: 20px;"
                            src="https://img.icons8.com/material-outlined/24/000000/linkedin.png" />
                    </span>
                </td>
            </tr>
        </table>
    </body>
</html>`;}