import { auth } from "@/auth";
import console from "console";

const Home = async () => {
  const session = await auth();
  console.log(session);
  return <div>Home</div>;
};

export default Home;
