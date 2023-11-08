module.exports = mongoose => {
    const eventSchema = mongoose.Schema(
        {
            name: String,
            unit: String,
            price: Number,
            note: String,
        },
        {timestamps: true}
    );

    eventSchema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("renters", eventSchema);
};
