module.exports = mongoose => {
    const orderSchema = mongoose.Schema(
        {
            event: String,
            renters: [String],
            address:String,
            phone: String,
            user: String,
        },
        {timestamps: true}
    );

    orderSchema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("orders", orderSchema);
};
