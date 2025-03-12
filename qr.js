const QRCode = require('qrcode');

async function generateQR(amount, phone) {
    const data = `https://payment.example.com/qr?phone=${phone}&amount=${amount}`;
    const qr = await QRCode.toDataURL(data);
    return qr;
}

module.exports = generateQR;