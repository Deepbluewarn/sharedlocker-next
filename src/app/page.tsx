import { auth } from "@/auth";
import { SignOut } from "./components/signout-button";
import { SignIn } from "./components/signin-button";

export default async function Home() {
  const session = await auth()

  const role = session?.user.role;

  return (
    <>
      <h1>Home</h1>
      {
        session?.user ? (
          <>
            <p>{`You are ${role}, Welcome!`}</p>
            <SignOut />
          </>
        ) : (
          <SignIn />
        )
      }
    </>
  );
}
