import LoginForm from "@/components/LoginForm";
import LogoutBTN from "@/components/LogoutBTN";
import { auth } from "@/lib/auth";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"Home"
};



export default async function Home() {
  const session = await auth()
  if(!session) {
    return (
      <>
      <LoginForm/>
      </>
    )
  }
  return (
    <div className="w-full p-5 xl:w-6xl mx-auto ">
      <p>All post,total views, total order,total total product,total </p>
    </div>
  );
}
