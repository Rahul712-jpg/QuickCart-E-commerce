import { clerkClient } from "@clerk/nextjs/server";

const authSeller = async (userId) => {
  try {

    const client = await clerkClient();

    const user = await client.users.getUser(userId);
    console.log(user.publicMetadata)

    return user.publicMetadata.role === "seller";

  } catch (error) {

    console.log("AUTH SELLER ERROR:", error);

    return false;
  }
};

export default authSeller;