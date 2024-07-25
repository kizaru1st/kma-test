import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Check Token Exist
    const token = req.get("Authorization");
    if (!token) throw new ResponseError(401, "Unauthorized");

    // Verify Token
    const user = await prismaClient.user.findFirst({
      where: {
        token,
      },
    });
    if (!user) throw new ResponseError(401, "Unauthorized");
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
