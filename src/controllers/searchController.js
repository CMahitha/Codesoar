import prismadb from "../utils/db.js";

export const searchByName = async (req, res) => {
  try {
    console.log(req.query.name);
    const name = req.query.name;

    //starting search staring name with query
    const startsWithUsers = await prismadb.user.findMany({
      where: {
        name: {
          startsWith: name,
        },
      },
      select: {
        name: true,
        phoneNumber: true,
      },
    });

    const startsWithContacts = await prismadb.contact.findMany({
      where: {
        name: {
          startsWith: name,
        },
      },
      select: {
        name: true,
        phoneNumber: true,
      },
    });

    // 2. Find contains matches (not starts-with)
    const containsUsers = await prismadb.user.findMany({
      where: {
        name: { contains: name, not: { startsWith: name } },
      },
      select: {
        name: true,
        phoneNumber: true,
      },
    });
    const containsContacts = await prismadb.contact.findMany({
      where: {
        name: { contains: name, not: { startsWith: name } },
      },
      select: {
        name: true,
        phoneNumber: true,
      },
    });

    // 3. Combine results, dedupe by phoneNumber (optional)
    const allResults = [
      ...startsWithUsers.map((u) => ({ ...u, type: "user" })),
      ...startsWithContacts.map((c) => ({ ...c, type: "contact" })),
      ...containsUsers.map((u) => ({ ...u, type: "user" })),
      ...containsContacts.map((c) => ({ ...c, type: "contact" })),
    ];

    // 4. Add spam likelihood
    const resultsWithSpam = await Promise.all(
      allResults.map(async (item) => {
        const spamCount = await prismadb.spam.count({
          where: { phoneNumber: item.phoneNumber },
        });
        return { ...item, spamLikelihood: spamCount };
      }),
    );

    return res.json(resultsWithSpam);
  } catch {
    return res.json({});
  }
  ``;
};
export const searchByPhone = async (req, res) => {
  try {
    console.log(req.query.phone);
    const phone = req.query.phone;

    const userId = req.userId;

    //searching if the user is register if registered sending it

    const searchingUser = await prismadb.user.findUnique({
      where: {
        phoneNumber: phone,
      },
      select: {
        name: true,
        phoneNumber: true,
        email: true,
        id: true,
      },
    });

    const result = {};
    if (searchingUser) {
      result.name = searchingUser.name;
      result.phoneNumber = searchingUser.phoneNumber;
      const spamCount = await prismadb.spam.count({
        where: { phoneNumber: phone },
      });

      const isInContactList = await prismadb.contact.findFirst({
        where: {
          id: searchingUser.id,
          phoneNumber: await prismadb.user.findUnique({
            where: {
              id: userId,
            },
          }).phoneNumber,
        },
      });

      if (isInContactList) {
        result.email = searchingUser.email;
      }
      return res.json({
        ...result,
        spamCount,
      });
    }

    //searching all containsContacts

    const contacts = await prismadb.contact.findMany({
      where: {
        phoneNumber: phone,
      },
      select: {
        name: true,
        phoneNumber: true,
      },
    });

    const resultsWithSpam = await Promise.all(
      contacts.map(async (contact) => {
        const spamCount = await prismadb.spam.count({
          where: { phoneNumber: contact.phoneNumber },
        });
        return { ...contact, spamLikelihood: spamCount };
      }),
    );
    if (resultsWithSpam.length > 0) {
      return res.json(resultsWithSpam);
    }
    return res.json({ message: "Contact NOT Found" });
  } catch (error) {
    console.log("[Search_Controller_Catch_block]", error);
    return res.json({ message: "something went wrong" });
  }
};
