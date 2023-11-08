module.exports = mongoose => {
    const eventSchema = mongoose.Schema(
        {
            name: String,
            description: String,
            startDate: Date,
            endDate: Date,
        },
        {timestamps: true}
    );

    eventSchema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("events", eventSchema);
};
