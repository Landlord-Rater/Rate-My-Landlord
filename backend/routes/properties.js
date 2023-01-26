const express = require("express");
const propertyController = require("../controllers/propertyController");
const auth = require("../middleware/auth");
const { ErrorResponse } = require("@remix-run/router");
const router = express.Router();

// get property associated with landlord
router.get("/:id", propertyController.getProperties, (req, res) => {
  res.status(200).json({
    property: res.locals.properties,
  });
});

// create property associated with landlord
router.post("/", propertyController.createProperty, (req, res) => {
  res.status(200).json({
    property: res.locals.property,
  });
});

// update property associated with landlord
router.put("/:id", propertyController.updateProperty, (req, res) => {
  res.status(200).json({
    property: res.locals.property,
  });
});

// delete property associated with landlord
router.delete("/:id", propertyController.deleteProperty, (req, res) => {
  res.status(200).json({ propertyId: res.locals.propertyId });
});

module.exports = router;
