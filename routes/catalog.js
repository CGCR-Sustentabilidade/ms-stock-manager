// CRIAR NOVOS ENDPOINTS COM BASE NO USER ROUTES
const express = require("express");
const router = express.Router();

// Require controller modules.
const users_controller = require("../controllers/usersController");

/// SYSTEM ROUTES ///


// /// USER ROUTES ///
// // GET request for one Users.
// router.get("/user/:id", users_controller.user_info);
// // GET request for list of all Userss.
// router.get("/user", users_controller.users_array);
// // POST request for creating Users.
// router.post("/user/create", users_controller.user_create_post);
// // DELETE request to delete Users.
// router.delete("/user/:id/delete", users_controller.user_delete);
// // UPDATE request to update Users.
// router.update("/user/:id/update", users_controller.user_update);

module.exports = router;
