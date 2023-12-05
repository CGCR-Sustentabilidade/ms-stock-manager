var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    brand: { type: String, required: false },
    created_at: { type: Date },
    description: { type: String, required: false },
    expiration_date: {type: Date, required: false},
    name: { type: String, required: true },
    quantity: { type: Number, required: false, default: 0 },
    status: { type: String, required: false, enum: ["Disponível", "Indisponível"], default: "Bloqueado" },
    type: { type: String, required: false, enum: ["Tipo 1", "Tipo 2", "Tipo 3"], default: "Tipo 3" },
    updated_at: { type: Date },
});

// Virtual for product brand and name
ProductSchema.virtual("brand_name").get(function () {
    return this.brand + " " + this.name;
});

// // Virtual for user's URL
// UserSchema.virtual("url").get(function () {
//     return "/system/user/" + this._id;
// });

//Export model
module.exports = mongoose.model("Product", ProductSchema);
