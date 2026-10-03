const PDFDocument = require('pdfkit');

const generateInvoice = (order) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      doc.fontSize(22).text('Pill Stream', { align: 'center' });
      doc.fontSize(14).text('BISMILLAH Pharmacy', { align: 'center' });
      doc.moveDown();
      doc.fontSize(18).text('Invoice', { align: 'center' });
      doc.moveDown();

      doc.fontSize(10).text(`Invoice Date: ${new Date().toLocaleDateString()}`);
      doc.text(`Order ID: ${order._id}`);
      doc.text(`Customer: ${order.user?.name || order.shippingAddress.fullName}`);
      doc.text(`Email: ${order.user?.email || 'N/A'}`);
      doc.text(`Phone: ${order.shippingAddress.phone}`);
      doc.text(`Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}`);
      doc.text(`Payment Method: ${order.paymentMethod}`);
      doc.text(`Payment Status: ${order.paymentStatus}`);
      doc.text(`Order Status: ${order.orderStatus}`);
      doc.moveDown();

      doc.fontSize(12).text('Items', { underline: true });
      doc.moveDown(0.5);
      order.orderItems.forEach((item, index) => {
        const lineTotal = item.quantity * item.price;
        doc.fontSize(10).text(`${index + 1}. ${item.name} | Qty: ${item.quantity} | Price: PKR ${item.price} | Total: PKR ${lineTotal}`);
      });

      doc.moveDown();
      doc.text(`Items Price: PKR ${order.itemsPrice}`);
      doc.text(`Delivery Fee: PKR ${order.deliveryFee}`);
      doc.fontSize(12).text(`Grand Total: PKR ${order.totalPrice}`, { align: 'right' });
      doc.moveDown();
      doc.fontSize(9).text('Note: This invoice is generated for academic/demo use. Please consult a doctor or pharmacist before using any medicine.');

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = generateInvoice;
