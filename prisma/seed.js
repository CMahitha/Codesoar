import { PrismaClient } from "../src/generated/prisma/client.js";
import { hashPassword } from "../src/utils/password.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.spam.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.user.deleteMany();

  // Seed Users
  const users = [
    {
      name: "Amit Kumar",
      phoneNumber: "9876543210",
      password: "password123",
      email: "amit@example.com",
    },
    {
      name: "Priya Sharma",
      phoneNumber: "9876543211",
      password: "password123",
      email: "priya@example.com",
    },
    {
      name: "Rahul Patel",
      phoneNumber: "9876543212",
      password: "password123",
      email: "rahul@example.com",
    },
    {
      name: "Sneha Gupta",
      phoneNumber: "9876543213",
      password: "password123",
      email: "sneha@example.com",
    },
    {
      name: "Vikram Singh",
      phoneNumber: "9876543214",
      password: "password123",
      email: "vikram@example.com",
    },
  ];

  const createdUsers = [];
  for (const user of users) {
    // const hashedPassword = await bcrypt.hash(user.password, 10)
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        password: await hashPassword(user.password),
      },
    });
    createdUsers.push(createdUser);
  }

  // Seed Contacts for each user
  // Each user will have a few random contacts (some overlapping phone numbers)
  const contactNames = [
    { name: "Ajay Verma", phoneNumber: "9876543220" },
    { name: "Bina Yadav", phoneNumber: "9876543221" },
    { name: "Chetan Mehta", phoneNumber: "9876543222" },
    { name: "Disha Kapoor", phoneNumber: "9876543223" },
    { name: "Esha Malhotra", phoneNumber: "9876543224" },
    { name: "Amit Kumar", phoneNumber: "9876543210" }, // Overlap with registered user
    { name: "Friend Amit", phoneNumber: "9876543210" }, // Another name for the same number
    { name: "Priya Sharma", phoneNumber: "9876543211" }, // Overlap with registered user
  ];

  for (let i = 0; i < createdUsers.length; i++) {
    // Each user gets 3-5 random contacts
    const randomContacts = contactNames
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 3);

    for (const contact of randomContacts) {
      await prisma.contact.create({
        data: {
          userId: createdUsers[i].id,
          name: contact.name,
          phoneNumber: contact.phoneNumber,
        },
      });
    }
  }

  // Seed Spam reports
  // Some numbers are marked as spam by different users
  const spamNumbers = [
    { phoneNumber: "9876543220", reportedByUserId: createdUsers[0].id },
    { phoneNumber: "9876543220", reportedByUserId: createdUsers[1].id },
    { phoneNumber: "9876543210", reportedByUserId: createdUsers[2].id },
    { phoneNumber: "9876543211", reportedByUserId: createdUsers[3].id },
  ];

  for (const spam of spamNumbers) {
    await prisma.spam.create({
      data: {
        phoneNumber: spam.phoneNumber,
        reportedByUserId: spam.reportedByUserId,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
