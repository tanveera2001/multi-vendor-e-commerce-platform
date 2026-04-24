const router = require("express").Router();
const { seedDatabase } = require("../controllers/seedController");

// ⚠️ DEV ONLY (you should protect this later)
router.post("/seed", seedDatabase);

module.exports = router;
