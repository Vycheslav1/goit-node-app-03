const express = require("express");

const { v4: uuidv4 } = require("uuid");

const loader = require("./models/contacts.js");

const validator = require("./validator.js");

const contactsList = async (req, res, next) => {
  try {
    const result = await loader.listContacts();
    if (result) {
      res.status(200).json(result);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const value = await validator.schemaId.validateAsync({
      id: id,
    });
    if (value) {
      res.status(400).json({ message: "Identifier is mot valid" });
    }
  } catch (error) {
    console.error(e);
    next(e);
  }
  try {
    const result = await loader.getContactById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const isFavorite = async (req, res, next) => {
  const { id } = req.params;
  try {
    const value = await validator.schemaId.validateAsync({
      id: id,
    });
    if (value) {
      res.status(400).json({ message: "Identifier is mot valid" });
    }
  } catch (error) {
    console.error(e);
    next(e);
  }
  try {
    const result = await loader.isFavorite(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;

  req.body.id = uuidv4();

  try {
    const value = await validator.schema.validateAsync({
      id: id,
      rname: name,
      email: email,
      phone: phone,
      favorite: favorite,
    });
    if (value) {
      res.status(400).json({ message: "missing required name field" });
    }
  } catch (error) {
    console.error(e);
    next(e);
  }
  try {
    const result = await loader.addContact(req.body);
    if (result) {
      res.status(201).json(result);
    }
  } catch (error) {
    console.error(e);
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const value = await validator.schemaId.validateAsync({
      id: req.params.contactId,
    });
    if (value) {
      res.status(400).json({ message: "Identifier is mot valid" });
    }
  } catch (error) {
    console.error(e);
    next(e);
  }
  try {
    const result = await loader.removeContact(req.params.contactId);
    if (result) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(e);
    next(e);
  }
};

const updateContacts = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "missing field favorite" });
  } else {
    try {
      const result = await loader.updateStatusContact(
        req.params.contactId,
        req.body
      );
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } catch (error) {
      console.error(e);
      next(e);
    }
  }
};

module.exports = {
  contactsList,
  getContact,
  removeContact,
  addContact,
  updateContacts,
  isFavorite,
};
