import { firestore } from './../../firebase/utils';
import { apiInstance } from '../../Utils';

export const handleSaveOrder = order => {
    const amount = order.orderTotal;
    const name = order.recipientName;
    const phone = order.recipientPhone;
    const address = order.shippingAddress;
    const paymentMethod = order.paymentMethod.type;
    const itemNames = order.orderItems.map(item => item.productName).toString();
    const email = `${order.recipientEmail},redlifestyl@gmail.com`;
    apiInstance.post('/sendemail', {
        subject: 'Rediva | Order Success',
        toMail: email,
        html: `<!DOCTYPE HTML
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <title></title>

    <style type="text/css">
        table,
        td {
            color: #000000;
        }

        a {
            color: #ced4d9;
            text-decoration: underline;
        }

        @media only screen and (min-width: 620px) {
            .u-row {
                width: 600px !important;
            }

            .u-row .u-col {
                vertical-align: top;
            }

            .u-row .u-col-33p33 {
                width: 199.98px !important;
            }

            .u-row .u-col-38p33 {
                width: 229.98px !important;
            }

            .u-row .u-col-61p67 {
                width: 370.02px !important;
            }

            .u-row .u-col-66p67 {
                width: 400.02px !important;
            }

            .u-row .u-col-100 {
                width: 600px !important;
            }

        }

        @media (max-width: 620px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }

            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }

            .u-row {
                width: calc(100% - 40px) !important;
            }

            .u-col {
                width: 100% !important;
            }

            .u-col>div {
                margin: 0 auto;
            }
        }

        body {
            margin: 0;
            padding: 0;
        }

        table,
        tr,
        td {
            vertical-align: top;
            border-collapse: collapse;
        }

        p {
            margin: 0;
        }

        .ie-container table,
        .mso-container table {
            table-layout: fixed;
        }

        * {
            line-height: inherit;
        }

        a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
        }
    </style>



    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet"
        type="text/css">
    <!--<![endif]-->

</head>

<body class="clean-body"
    style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #9b1a1a;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table
        style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #9b1a1a;width:100%"
        cellpadding="0" cellspacing="0">
        <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #9b1a1a;"><![endif]-->


                    <div class="u-row-container" style="padding: 29px 10px 0px;background-color: rgba(255,255,255,0)">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #000000;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 29px 10px 0px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #000000;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="230" style="width: 230px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-38p33"
                                    style="max-width: 320px;min-width: 230px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 34px; line-height: 47.6px; color: #ffffff;">
                                                                        REDIVA</span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="370" style="width: 370px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-61p67"
                                    style="max-width: 320px;min-width: 370px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:44px 20px 20px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="color: #ffffff; line-height: 120%; text-align: right; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 120%;"><span
                                                                        style="font-size: 22px; line-height: 26.4px;">Order
                                                                        Placed Successfully</span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f5f5f5;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f5f5f5;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:35px 20px 10px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="line-height: 120%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 120%;"><span
                                                                        style="font-size: 24px; line-height: 28.8px; color: #000000;"><strong>Shipping
                                                                            Address</strong></span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 20px 30px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="color: #757575; line-height: 160%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 160%;">${name}
                                                                </p>
                                                                <p style="font-size: 14px; line-height: 160%;">${phone}
                                                                </p>
                                                                <p style="font-size: 14px; line-height: 160%;">
                                                                    ${address.line1}</p>
                                                                <p style="font-size: 14px; line-height: 160%;">
                                                                    ${address.line2 ? address.line2 : ''}</p>
                                                                <p style="font-size: 14px; line-height: 160%;">
                                                                    ${address.city},${address.state},${address.postal_code}
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 20px 20px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 120%;">
                                                                    <strong><span
                                                                            style="font-size: 24px; line-height: 28.8px;">Purchesed
                                                                            Items</span></strong></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <table height="0px" align="center" border="0"
                                                                cellpadding="0" cellspacing="0" width="100%"
                                                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #e3e3e3;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                <tbody>
                                                                    <tr style="vertical-align: top">
                                                                        <td
                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                            <span>&#160;</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>






                    <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="400" style="width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-66p67"
                                    style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:28px 20px 20px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="color: #333333; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <p
                                                                    style="text-align: justify; line-height: 140%; font-size: 14px;">
                                                                    <span
                                                                        style="color: #000000; font-family: Open Sans, Arial, sans-serif;"><span
                                                                            style="font-size: 18px; line-height: 25.2px;">${itemNames}</span></span>
                                                                </p>
                                                                
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-33p33"
                                    style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 20px 20px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 120%;"><span
                                                                        style="font-size: 24px; line-height: 28.8px;"><strong><span
                                                                                style="line-height: 28.8px; font-size: 20px;">Payment Mode</span></strong></span>
                                                                </p>
                                                                <p style="font-size: 14px; line-height: 120%;"><span
                                                                    style="font-size: 24px; line-height: 28.8px;"><strong><span
                                                                            style="line-height: 28.8px; color: green; font-size: 24px;">${paymentMethod}</span></strong></span>
                                                            </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <table height="0px" align="center" border="0"
                                                                cellpadding="0" cellspacing="0" width="100%"
                                                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #e3e3e3;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                <tbody>
                                                                    <tr style="vertical-align: top">
                                                                        <td
                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                            <span>&#160;</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="400" style="width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-66p67"
                                    style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:28px 20px 25px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="color: #333333; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 24px; line-height: 33.6px;"><strong><span
                                                                                style="line-height: 33.6px; font-size: 24px;">Grand
                                                                                Total</span></strong></span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-33p33"
                                    style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:35px 20px 20px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 120%;">
                                                                    <strong><span
                                                                            style="font-size: 30px; line-height: 36px;">${amount}</span></strong>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px 10px 20px;background-color: rgba(255,255,255,0)">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #000000;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px 20px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #000000;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 20px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;">RED, All
                                                                    Rights Reserved</p>
                                                                <p style="font-size: 14px; line-height: 140%;">&nbsp;
                                                                </p>
                                                                <p style="font-size: 14px; line-height: 140%;"><a
                                                                        href="https://rediva-lifestyle.web.app/"
                                                                        target="_self">rediva-lifestyle.web.app</a></p>
                                                                <p style="font-size: 14px; line-height: 140%;"><a
                                                                        href="https://rediva-lifestyle.web.app/returnpolicy"
                                                                        target="_self">Return Policy</a> | <a
                                                                        href="https://rediva-lifestyle.web.app/"
                                                                        target="_self">Shop</a>| <a
                                                                        href="https://rediva-lifestyle.web.app/dashboard"
                                                                        target="_blank" rel="noopener">My Account</a>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>


                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
            </tr>
        </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
</body>

</html>`
    });
    return new Promise((resolve, reject) => {
        firestore
            .collection('orders')
            .doc()
            .set(order)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const handleSetOrderStatus = ({ payload1, payload2, order, lastUpdated }) => {
    const amount = order.orderTotal;
    const name = order.recipientName;
    const phone = order.recipientPhone;
    const address = order.shippingAddress;
    const paymentMethod = order.paymentMethod.type;
    const itemNames = order.orderItems.map(item => item.productName).toString();
    const email = `${order.recipientEmail},redlifestyl@gmail.com`;

    const html = `<!DOCTYPE html>
    <html lang="en">
    
    
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
    
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
    
        <style type="text/css">
            table,
            td {
                color: #000000;
            }
    
            a {
                color: #ced4d9;
                text-decoration: underline;
            }
    
            @media only screen and (min-width: 620px) {
                .u-row {
                    width: 600px !important;
                }
    
                .u-row .u-col {
                    vertical-align: top;
                }
    
                .u-row .u-col-33p33 {
                    width: 199.98px !important;
                }
    
                .u-row .u-col-38p33 {
                    width: 229.98px !important;
                }
    
                .u-row .u-col-61p67 {
                    width: 370.02px !important;
                }
    
                .u-row .u-col-66p67 {
                    width: 400.02px !important;
                }
    
                .u-row .u-col-100 {
                    width: 600px !important;
                }
    
            }
    
            @media (max-width: 620px) {
                .u-row-container {
                    max-width: 100% !important;
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                }
    
                .u-row .u-col {
                    min-width: 320px !important;
                    max-width: 100% !important;
                    display: block !important;
                }
    
                .u-row {
                    width: calc(100% - 40px) !important;
                }
    
                .u-col {
                    width: 100% !important;
                }
    
                .u-col>div {
                    margin: 0 auto;
                }
            }
    
            body {
                margin: 0;
                padding: 0;
            }
    
            table,
            tr,
            td {
                vertical-align: top;
                border-collapse: collapse;
            }
    
            p {
                margin: 0;
            }
    
            .ie-container table,
            .mso-container table {
                table-layout: fixed;
            }
    
            * {
                line-height: inherit;
            }
    
            a[x-apple-data-detectors='true'] {
                color: inherit !important;
                text-decoration: none !important;
            }
        </style>
    
    
    
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet"
            type="text/css">
        <!--<![endif]-->
    
    </head>
    
    <body class="clean-body"
        style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #9b1a1a;color: #000000">
        <table
            style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #9b1a1a;width:100%"
            cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    
    
                        <div class="u-row-container" style="padding: 29px 10px 0px;background-color: rgba(255,255,255,0)">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #000000;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
    
                                    <div class="u-col u-col-38p33"
                                        style="max-width: 320px;min-width: 230px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 140%;"><span
                                                                            style="font-size: 34px; line-height: 47.6px; color: #ffffff;">
                                                                            REDIVA</span></p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="370" style="width: 370px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-61p67"
                                        style="max-width: 320px;min-width: 370px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
    
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:44px 20px 20px;font-family:'Lato',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="color: #ffffff; line-height: 120%; text-align: right; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 120%;"><span
                                                                            style="font-size: 22px; line-height: 26.4px;">Order
                                                                            has been ${payload2}</span></p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                        </div>
    
    
    
                        <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f5f5f5;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
    
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:35px 20px 10px;font-family:'Lato',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="line-height: 120%; text-align: left; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 120%;"><span
                                                                            style="font-size: 24px; line-height: 28.8px; color: #000000;"><strong>Shipping
                                                                                Address</strong></span></p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 20px 30px;font-family:'Lato',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="color: #757575; line-height: 160%; text-align: left; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 160%;">${name}
                                                                    </p>
                                                                    <p style="font-size: 14px; line-height: 160%;">${phone}
                                                                    </p>
                                                                    <p style="font-size: 14px; line-height: 160%;">
                                                                        ${address.line1}</p>
                                                                    <p style="font-size: 14px; line-height: 160%;">
                                                                        ${address.line2 ? address.line2 : ''}</p>
                                                                    <p style="font-size: 14px; line-height: 160%;">
                                                                        ${address.city},${address.state},${address.postal_code}
                                                                    </p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
    
    
                        <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
    
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 20px 20px;font-family:'Lato',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 120%;">
                                                                        <strong><span
                                                                                style="font-size: 24px; line-height: 28.8px;">Purchesed
                                                                                Items</span></strong>
                                                                    </p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Lato',sans-serif;"
                                                                align="left">
    
                                                                <table height="0px" align="center" border="0"
                                                                    cellpadding="0" cellspacing="0" width="100%"
                                                                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #e3e3e3;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                    <tbody>
                                                                        <tr style="vertical-align: top">
                                                                            <td
                                                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                <span>&#160;</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
    
    
    
    
    
                        <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
    
                                    <div class="u-col u-col-66p67"
                                        style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:28px 20px 20px;font-family:'Lato',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="color: #333333; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p
                                                                        style="text-align: justify; line-height: 140%; font-size: 14px;">
                                                                        <span
                                                                            style="color: #000000; font-family: Open Sans, Arial, sans-serif;"><span
                                                                                style="font-size: 18px; line-height: 25.2px;">${itemNames}</span></span>
                                                                    </p>
    
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                            </div>
                                        </div>
                                    </div>
                                    <div class="u-col u-col-33p33"
                                        style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 20px 20px;font-family:'Lato',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 120%;"><span
                                                                            style="font-size: 24px; line-height: 28.8px;"><strong><span
                                                                                    style="line-height: 28.8px; font-size: 20px;">Payment
                                                                                    Mode</span></strong></span>
                                                                    </p>
                                                                    <p style="font-size: 14px; line-height: 120%;"><span
                                                                            style="font-size: 24px; line-height: 28.8px;"><strong><span
                                                                                    style="line-height: 28.8px; color: green; font-size: 24px;">${paymentMethod}</span></strong></span>
                                                                    </p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
    
    
                        <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Lato',sans-serif;"
                                                                align="left">
    
                                                                <table height="0px" align="center" border="0"
                                                                    cellpadding="0" cellspacing="0" width="100%"
                                                                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #e3e3e3;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                    <tbody>
                                                                        <tr style="vertical-align: top">
                                                                            <td
                                                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                <span>&#160;</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
    
    
                        <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                    <div class="u-col u-col-66p67"
                                        style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:28px 20px 25px;font-family:'Lato',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="color: #333333; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 140%;"><span
                                                                            style="font-size: 24px; line-height: 33.6px;"><strong><span
                                                                                    style="line-height: 33.6px; font-size: 24px;">Grand
                                                                                    Total</span></strong></span></p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                            </div>
                                        </div>
                                    </div>
                                    <div class="u-col u-col-33p33"
                                        style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:35px 20px 20px;font-family:'Lato',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 120%;">
                                                                        <strong><span
                                                                                style="font-size: 30px; line-height: 36px;">${amount}</span></strong>
                                                                    </p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
    
    
                        <div class="u-row-container" style="padding: 0px 10px 20px;background-color: rgba(255,255,255,0)">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #000000;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 20px;font-family:'Lato',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 140%;">RED, All
                                                                        Rights Reserved</p>
                                                                    <p style="font-size: 14px; line-height: 140%;">&nbsp;
                                                                    </p>
                                                                    <p style="font-size: 14px; line-height: 140%;"><a
                                                                            href="https://rediva-lifestyle.web.app/"
                                                                            target="_self">rediva-lifestyle.web.app</a></p>
                                                                    <p style="font-size: 14px; line-height: 140%;"><a
                                                                            href="https://rediva-lifestyle.web.app/returnpolicy"
                                                                            target="_self">Return Policy</a> | <a
                                                                            href="https://rediva-lifestyle.web.app/"
                                                                            target="_self">Shop</a>| <a
                                                                            href="https://rediva-lifestyle.web.app/dashboard"
                                                                            target="_blank" rel="noopener">My Account</a>
                                                                    </p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
    
                    </td>
                </tr>
            </tbody>
        </table>
    
    </body>
    
    </html>`

    const data_to_send = {
        subject: 'Rediva | Order Status',
        toMail: email,
        html: html
    }


    apiInstance.post('/sendemail', {

        subject: "Rediva | Order Status",
        toMail: email,
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
        
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <style type="text/css">
                * {
                    margin: 0;
                    padding: 0;
                }
        
        
                .bg {
                    background-color: #9b1a1a;
                    padding: 30px;
                }
        
                .content {
                    margin: 50px 20px;
                    min-width: 300px;
                    background-color: white;
        
                }
        
                .top {
                    padding: 20px 10px;
                }
        
                .address {
                    padding: 20px 20px;
                    background-color: lightgray;
                }
        
                .address h2,
                p {
        
                    margin-bottom: 5px;
                }
        
                .section {
                    background-color: rgba(0, 0, 0, 0.6);
                    color: white;
                }
        
                .purshase {
                    padding: 20px;
                    border-bottom: 1px solid gray;
                }
        
                .purchase-items {
                    padding: 20px;
        
                    border-bottom: 1px solid gray;
                }
        
                .bottom {
                    text-align: center;
                    padding: 20px;
                }
        
                .bottom p a {
                    font-size: .8em;
                }
        
                @media screen and (max-width: 575px) {
                    .bg {
                        padding: 20px 10px;
                    }
        
        
                    .content {
                        margin: 10px;
                    }
        
                    h1 {
                        font-size: 1em;
                    }
        
                    h2 {
                        font-size: .9em;
                    }
        
                    h3 {
                        font-size: .8em;
                    }
        
                    p {
                        font-size: .7em;
                    }
                }
            </style>
        </head>
        
        <body>
            <div class="bg">
                <div class="content">
                    <div class="top">
                        <h1>
                            REDIVA
                        </h1>
                        <h3>
                            Order ${payload2}
                        </h3>
                    </div>
                    <div class="address">
                        <h2>
                            Shipping Address
                        </h2>
                        <p>${name}
                        </p>
                        <p>${phone}
                        </p>
                        <p>
                            ${address.line1}</p>
                        <p>
                            ${address.line2 ? address.line2 : ''}</p>
                        <p>
                            ${address.city},${address.state},${address.postal_code}
                        </p>
                    </div>
                    <div class="section">
        
        
                        <div class="purshase">
                            <h2>
                                Purchased Items
                            </h2>
                        </div>
                        <div class="purchase-items">
                            <h3>
                                ${itemNames}
                            </h3> <br />
                            <div>
                                Payment Mode <br />${paymentMethod}
                            </div>
                        </div>
                        <div class="purchase-items">
                            <h2>
                                Grand Total
                            </h2>
                            <h2>
                                ${amount}
                            </h2>
                        </div>
                    </div>
                    <div class="bottom">
                        RED, All Rights Reserved
                        <p><a href="https://rediva-lifestyle.web.app/" target="_self">rediva-lifestyle.web.app</a></p>
                        <p><a href="https://rediva-lifestyle.web.app/returnpolicy" target="_self">Return Policy</a> | <a
                                href="https://rediva-lifestyle.web.app/" target="_self">Shop</a> | <a
                                href="https://rediva-lifestyle.web.app/dashboard" target="_blank" rel="noopener">My Account</a>
                        </p>
                    </div>
                </div>
            </div>
        
        </body>
        
        </html>`

    }
    );


    return new Promise((resolve, reject) => {
        firestore
            .collection("orders")
            .doc(payload1)
            .update({ orderStatus: payload2, lastUpdated: lastUpdated })
            .then(() => {
                resolve();
            })
            .catch(err => {
                console.log(err)
            })
    })

}

export const handleGetUserOrderHistory = uid => {
    return new Promise((resolve, reject) => {
        let ref = firestore.collection('orders').orderBy('orderCreatedDate', 'desc');
        if (uid === 'admin')
            ref = ref;
        else
            ref = ref.where('orderUserID', '==', uid);

        ref
            .get()
            .then(snap => {
                const data = [
                    ...snap.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ];

                resolve({ data });
            })
            .catch(err => {
                reject(err);
            });


    });
};


export const handleGetOrder = orderID => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('orders')
            .doc(orderID)
            .get()
            .then(snap => {
                if (snap.exists) {
                    resolve({
                        ...snap.data(),
                        documentID: orderID
                    })
                }
            })
            .catch(err => {
                reject(err);
            })
    })
}