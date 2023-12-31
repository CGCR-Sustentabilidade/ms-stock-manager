var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    created_at: { type: Date },
    description: { type: String, required: true },
    name: { type: String, required: true },
    job_title: { type: String, required: true },
    status: { type: String, required: true, enum: ["Regular", "Irregular"], default: "Não triado" },
    type: { type: String, required: true, enum: ["Tipo 1", "Tipo 2", "Tipo 3"], default: "Tipo 3" },
    updated_at: { type: Date },
});

// Virtual for employee description and name
EmployeeSchema.virtual("description_name").get(function () {
    return this.description + " " + this.name;
});

// // Virtual for user's URL
// UserSchema.virtual("url").get(function () {
//     return "/system/user/" + this._id;
// });

//Export model
module.exports = mongoose.model("Employee", EmployeeSchema);
