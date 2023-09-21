require('./config/mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const memberRouter = require('./route/member');
const bakerRouter = require('./route/baker');
const productRouter = require('./route/product');
const orderRouter = require('./route/order');

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/member', memberRouter);
app.use('/baker', bakerRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
