var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    brand: { type: String, required: true },
    created_at: { type: Date },
    description: { type: String, required: true },
    expiration_date: {type: Date, required: true},
    quantity: { type: Number, required: false, default: 0 },
    status: { type: String, required: true, enum: ["Disponível", "Indisponível"], default: "Bloqueado" },
    title: { type: String, required: true },
    type: { type: String, required: true, enum: ["Tipo 1", "Tipo 2", "Tipo 3"], default: "Tipo 3" },
    updated_at: { type: Date },
});

// Virtual for product brand and title
ProductSchema.virtual("brand_title").get(function () {
    return this.brand + " " + this.title;
});

// // Virtual for user's URL
// UserSchema.virtual("url").get(function () {
//     return "/system/user/" + this._id;
// });

//Export model
module.exports = mongoose.model("Product", ProductSchema);
