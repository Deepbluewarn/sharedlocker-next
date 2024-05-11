import { auth } from "@/auth";
import { SignOut } from "./components/signout-button";
import { SignIn } from "./components/signin-button";

export default async function Home() {
  const session = await auth()

  return (
    <>
      <h1>Home</h1>
      {JSON.stringify(session)}

      {
        session?.user ? (
          <SignOut />
        ) : (
          <SignIn />
        )
      }
    </>

  );
}
