const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');


const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
})

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if(!name || !email || !phone) {
        return res.status(400).json({message: "Please enter all fields"});
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(200).json(contact);
})


const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        return res.status(404).json({message: "Contact not found"});
    }
    res.status(200).json(contact);
})

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        return res.status(404).json({message: "Contact not found"});
    }

    if(contact.user_id.toString() !== req.user.id) {
        return res.status(401).json({message: "Not authorized to update contact"});
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.status(200).json(updatedContact);
})

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        return res.status(404).json({message: "Contact not found"});
    }
    if(contact.user_id.toString() !== req.user.id) {
        return res.status(401).json({message: "Not authorized to delete contact"});
    }
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({message: `Deleted contact ${deletedContact.name}`});
})

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };