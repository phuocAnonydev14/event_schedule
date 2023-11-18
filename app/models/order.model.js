module.exports = (mongoose) => {
  const orderSchema = mongoose.Schema(
    {
      renters: [
        {
          renter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "renters",
          },
          quantity: Number,
        },
      ],
      method: String,
      paypalId: String,
      address: String,
      phone: String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
    { timestamps: true }
  );

  orderSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("orders", orderSchema);
};
