import prismadb from "../utils/db.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken, verifyToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { email, password, phoneNumber, name } = req.body;
    const existingUser = await prismadb.user.findUnique({
      where: {
        phoneNumber,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already registered",
      });
    }

    //hasing password
    const hashedPassword = await hashPassword(password);
    console.log(hashPassword);

    //creating new user
    const userData = {
      name,
      password: hashedPassword,
      phoneNumber,
    };

    if (email) {
      userData.email = email;
    }
    const newUser = await prismadb.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        phoneNumber: true,
        name: true,
        createdAt: true,
      },
    });

    const token = generateToken({
      userId: newUser.id,
      phoneNumber: newUser.phoneNumber,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        newUser,
        token,
      },
    });
  } catch (error) {
    console.log("[Error in AUTH Register function]");
  }
};

export const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await prismadb.user.findUnique({
      where: {
        phoneNumber,
      },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.json({ message: "Enter valid phone no or password" });
    }

    const token = generateToken({
      userId: user.id,
      phoneNumber: user.phoneNumber,
    });

    res.status(200).json({
      success: true,
      message: "User Login successfull",
      data: {
        token,
      },
    });
  } catch (e) {
    res.json({ message: "Something went wrong" });
  }
};
