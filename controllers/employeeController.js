const Employee = require("../models/employee");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { DateTime } = require("luxon");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display detail for a specific employee.
exports.get_one_employee = asyncHandler(async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).exec();

    if (employee === null) {
      const err = new Error("Employee not found");
      err.status = 404;
      return next(err);
    }

    return res.status(200).json(employee)
  } catch (error) {
    console.log('error: ', error)
    const err = new Error("Error when trying to get one employee.");
    err.status = 400;
    return next(err);
  }
});

// Display list of all employees.
exports.list_employees = asyncHandler(async (req, res, next) => {
  try {
    const allEmployees = await Employee.find({}, "created_at description name status type updated_at")
      .sort({ name: 1 })
      .exec();

    return res.status(200).json(allEmployees)
  } catch (error) {
    console.log('error: ', error)
    const err = new Error("Error when trying to get all employees.");
    err.status = 400;
    return next(err);
  }
});

// Handle employee create on POST.
exports.post_employee = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name can't be empty.")
    .isAlpha()
    .withMessage("Name must be alphabet letters."),

  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const employee = new Employee({
        created_at: req.body.employee.created_at,
        description: req.body.employee.description,
        name: req.body.employee.name,
        status: req.body.employee.status,
        type: req.body.employee.type,
        updated_at: req.body.employee.updated_at
      });

      // Handle empty date values
      if (employee != null) {
        if (!employee.created_at)
          employee.created_at = DateTime.now()
        if (!employee.updated_at)
          employee.updated_at = DateTime.now()
      }

      if (errors.isEmpty()) {
        const err = new Error("Invalid Employee fields!");
        err.status = 400;
        return next(err);
      } else {
        const employeeExists = await Employee.findOne({ name: req.body.employee.name }).exec();
        if (employeeExists) {
          const err = new Error("Employee already exists!");
          err.status = 400;
          return next(err);
        } else {
          await employee.save();
          res.status(200).json(employee)
        }
      }
    } catch (error) {
      console.log('error: ', error)
      const err = new Error("Error when trying to save a new employee.");
      err.status = 400;
      return next(err);
    }
  }),
];

// Handle employee delete on POST.
exports.post_delete_employee = asyncHandler(async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).exec();

    if (employee === null) {
      const err = new Error("Employee doesn't exists.");
      err.status = 404;
      return next(err);
    }

    await Employee.findByIdAndRemove(employee._id);
    return res.status(200).json({})
  } catch (error) {
    console.log('error: ', error)
    const err = new Error("Error when trying to delete a employee.");
    err.status = 400;
    return next(err);
  }
});

// Handle employee update on POST.
exports.post_update_employee = [
  (req, res, next) => {
    if (!(req.body.employee instanceof Array)) {
      if (typeof req.body.employee === "undefined") {
        req.body.employee = [];
      } else {
        req.body.employee = new Array(req.body.employee);
      }
    }
    next();
  },

  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    try {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a Employee object with escaped/trimmed data and old id.
      const employee = new Employee({
        created_at: req.body.employee[0].created_at,
        description: req.body.employee[0].description,
        name: req.body.employee[0].name,
        status: req.body.employee[0].status,
        type: req.body.employee[0].type,
        updated_at: DateTime.now(), // new updated_at date
        _id: req.params.id // This is required, or a new ID will be assigned!
      });

      if (errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
        const err = new Error("Invalid Employee fields to update!");
        err.status = 400;
        return next(err);
      } else {
        // Data from form is valid. Update the item.
        const current_employee = await Employee.findByIdAndUpdate(req.params.id, employee, {});
        res.status(201).json(employee)
      }
    } catch (error) {
      console.log('error: ', error)
      const err = new Error("Error when trying to update a employee.");
      err.status = 400;
      return next(err);
    }
  }),
];
