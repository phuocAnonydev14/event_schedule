module.exports = mongoose => {
    const eventSchema = mongoose.Schema(
        {
            name: String,
            description: String,
            startDate: String,
            endDate: String,
            phone: String,
            role: String,
            avatar: String,
            dob: Date
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
