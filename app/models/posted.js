const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

const postedSchema = Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    subject: { type: String, required: true },
    message: { type: String },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

postedSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Posted", postedSchema);
