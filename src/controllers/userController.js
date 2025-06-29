import prismadb from "../utils/db.js";

export const addContact = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const userId = req.userId;

    const alreadyContact = await prismadb.contact.findFirst({
      where: {
        userId,
        phoneNumber,
      },
    });
    if (alreadyContact) {
      return res.json({ message: "Already Contact Exists" });
    }

    const newContact = await prismadb.contact.create({
      data: {
        phoneNumber,
        name,
        userId,
      },
    });

    return res.json({ message: "successfully contact Added", newContact });
  } catch (error) {
    console.log("[ADD_NEWCONTACT_CATCH_BLOCK_ERROR]", error);
    res.json({ message: "Something went wrong" }).status(500);
  }
};

export const getContacts = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await prismadb.contact.findMany({
      where: {
        userId: userId,
      },
    });

    if (result) {
      return res.json(result);
    }
    return res.json({ message: "Zero Contacts" });
  } catch (error) {
    console.log("[GET_CONTACTS_USERCONTROLLER]", error);
    return res.json({ message: "something went wrong" }).status(500);
  }
};
