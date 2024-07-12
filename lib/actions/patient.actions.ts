"use server";

import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";

// CREATE APP WRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return newuser;
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser?.users[0];
    }

    console.error("An error occurred while creating a new user:", error);
  }
};
