const express = require("express");

const router = express.Router();

const controller = require("./controllers.js");

router.get("/", controller.contactsList);

router.get("/:contactId", controller.getContact);

router.get("/:contactId", controller.isFavorite);

router.post("/", controller.addContact);

router.delete("/:contactId", controller.removeContact);

router.put("/:contactId", controller.updateContacts);

module.exports = router;
