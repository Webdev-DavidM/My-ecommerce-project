import mongoose from 'mongoose';

//please adjust the name of the model titles as required

const ordersSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "Please provide a value for 'ObjectId'"],
    },
    dateOfOrder: {
      type: String,
      required: [true, "Please provide a value for 'date'"],
    },
    // There is a product array so each product can be put in as
    // an object with a quantity.
    orderItems: [
      {
        qty: {
          type: Number,
          required: [true, "Please provide a value for 'qty'"],
        },
        size: {
          type: String,
          required: [true, "Please provide a value for 'size'"],
        },
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'please provide a product i.d'],
        },
        price: {
          type: Number,
          required: [true, "Please provide a value for 'price'"],
        },
      },
    ],
    total: {
      type: Number,
      required: [true, "Please provide a value for 'total'"],
    },
    status: {
      type: String,
      required: [true, "Please provide a value for 'status'"],
    },
  },
  { useUnifiedTopology: true }
);

const Order = mongoose.model('Orders', ordersSchema);

export default Order;
