// routes/workItemRoutes.js

const express = require("express");
const router = express.Router();
const workItemController = require("../controllers/workItemController");

router.get("/", workItemController.getAllWorkItems);
router.put("/:id", workItemController.updateWorkItem);
router.delete("/:id", workItemController.deleteWorkItem);

module.exports = router;
