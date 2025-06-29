import prismadb from "../utils/db.js";

export const spamANumber = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const userId = req.userId;

  const alreadySpam = await prismadb.spam.findUnique({
    where: {
      phoneNumber_reportedByUserId: {
        phoneNumber,
        reportedByUserId: userId,
      },
    },
  });
  if (alreadySpam) {
    return res.json({ message: "already spammed" });
  }
  const newSpam = await prismadb.spam.create({
    data: {
      phoneNumber,
      reportedByUserId: userId,
    },
  });

  return res.json({ message: "successfully added to spam", newSpam });
};
