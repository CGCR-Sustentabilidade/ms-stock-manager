const Elderly = require("../models/elderly");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { DateTime } = require("luxon");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display detail for a specific elderly.
exports.get_one_elderly = asyncHandler(async (req, res, next) => {
  try {
    const elderly = await Elderly.findById(req.params.id).exec();

    if (elderly === null) {
      const err = new Error("Elderly not found");
      err.status = 404;
      return next(err);
    }

    return res.status(200).json(elderly)
  } catch (error) {
    console.log('error: ', error)
    const err = new Error("Error when trying to get one elderly.");
    err.status = 400;
    return next(err);
  }
});

// Display list of all elderlies.
exports.list_elderlies = asyncHandler(async (req, res, next) => {
  try {
    const allElderlies = await Elderly.find({}, "created_at description name status type updated_at")
      .sort({ name: 1 })
      .exec();

    return res.status(200).json(allElderlies)
  } catch (error) {
    console.log('error: ', error)
    const err = new Error("Error when trying to get all elderlies.");
    err.status = 400;
    return next(err);
  }
});

// Handle elderly create on POST.
exports.post_elderly = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name can't be empty.")
    .isAlpha()
    .withMessage("Name must be alphabet letters."),

  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const elderly = new Elderly({
        created_at: req.body.elderly.created_at,
        description: req.body.elderly.description,
        name: req.body.elderly.name,
        status: req.body.elderly.status,
        type: req.body.elderly.type,
        updated_at: req.body.elderly.updated_at
      });

      // Handle empty date values
      if (elderly != null) {
        if (!elderly.created_at)
          elderly.created_at = DateTime.now()
        if (!elderly.updated_at)
          elderly.updated_at = DateTime.now()
      }

      if (errors.isEmpty()) {
        const err = new Error("Invalid Elderly fields!");
        err.status = 400;
        return next(err);
      } else {
        const elderlyExists = await Elderly.findOne({ name: req.body.elderly.name }).exec();
        if (elderlyExists) {
          const err = new Error("Elderly already exists!");
          err.status = 400;
          return next(err);
        } else {
          await elderly.save();
          res.status(200).json(elderly)
        }
      }
    } catch (error) {
      console.log('error: ', error)
      const err = new Error("Error when trying to save a new elderly.");
      err.status = 400;
      return next(err);
    }
  }),
];

// Handle elderly delete on POST.
exports.post_delete_elderly = asyncHandler(async (req, res, next) => {
  try {
    const elderly = await Elderly.findById(req.params.id).exec();

    if (elderly === null) {
      const err = new Error("Elderly doesn't exists.");
      err.status = 404;
      return next(err);
    }

    await Elderly.findByIdAndRemove(elderly._id);
    return res.status(200).json({})
  } catch (error) {
    console.log('error: ', error)
    const err = new Error("Error when trying to delete a elderly.");
    err.status = 400;
    return next(err);
  }
});

// Handle elderly update on POST.
exports.post_update_elderly = [
  (req, res, next) => {
    if (!(req.body.elderly instanceof Array)) {
      if (typeof req.body.elderly === "undefined") {
        req.body.elderly = [];
      } else {
        req.body.elderly = new Array(req.body.elderly);
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

      // Create a Elderly object with escaped/trimmed data and old id.
      const elderly = new Elderly({
        created_at: req.body.elderly[0].created_at,
        description: req.body.elderly[0].description,
        name: req.body.elderly[0].name,
        status: req.body.elderly[0].status,
        type: req.body.elderly[0].type,
        updated_at: DateTime.now(), // new updated_at date
        _id: req.params.id // This is required, or a new ID will be assigned!
      });

      if (errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
        const err = new Error("Invalid Elderly fields to update!");
        err.status = 400;
        return next(err);
      } else {
        // Data from form is valid. Update the item.
        const current_elderly = await Elderly.findByIdAndUpdate(req.params.id, elderly, {});
        res.status(201).json(elderly)
      }
    } catch (error) {
      console.log('error: ', error)
      const err = new Error("Error when trying to update a elderly.");
      err.status = 400;
      return next(err);
    }
  }),
];
