import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn('kakao')
      }}
    >
      <button type="submit">Signin with Kakao</button>
    </form>
  )
}