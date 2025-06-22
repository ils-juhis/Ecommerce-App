const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const universalFun  = require("../utils/universalFunctions")
const responseMessage = require('../utils/responseMessages')

//create order
exports.newOrder = catchAsyncErrors(async(req, res, next)=>{
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    return universalFun.sendSuccess(
      responseMessage.SUCCESS.ORDER_CREATED,
      order,
      res
    )
})

// get single Order
exports.getSingleOrder = catchAsyncErrors(async(req, res, next)=>{
  const orders = await Order.findById(req.params.id).populate("user", " name email")
  if(!orders){
    return next( new Errorhandler(responseMessage.ERROR.ORDER_NOT_FOUND.customMessage, responseMessage.ERROR.ORDER_NOT_FOUND.statusCode))
  }
  return universalFun.sendSuccess(
    responseMessage.SUCCESS.SINGLE_ORDER_FETCHED,
    orders,
    res
  )
})

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async(req, res, next)=>{
  const orders = await Order.find({user: req.user._id})

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.ALL_ORDER_FETCHED,
    orders,
    res
  )
})

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.ALL_ORDER_FETCHED,
    {
      orders,
      totalAmount
    },
    res
  )
});

// update Order status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next( new Errorhandler(responseMessage.ERROR.ORDER_NOT_FOUND.customMessage, responseMessage.ERROR.ORDER_NOT_FOUND.statusCode))
  }

  if (order.orderStatus === "Delivered") {
    return next(new Errorhandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  return universalFun.sendSuccess(
    responseMessage.SUCCESS.ORDER_UPDATED,
    {},
    res
  )
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next( new Errorhandler(responseMessage.ERROR.ORDER_NOT_FOUND.customMessage, responseMessage.ERROR.ORDER_NOT_FOUND.statusCode))
  }

  await Order.deleteOne({_id: req.params.id})

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.ORDER_DELETED,
    {},
    res
  )
});