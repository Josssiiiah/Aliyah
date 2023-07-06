import { Layout } from "@/components/layout";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";
import Typed from "react-typed";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex max-h-screen w-screen flex-col items-center bg-deepblue ">
        <div className="mx-6 max-w-4xl">
          <div className="text-6xl md:text-7xl lg:text-8xl">
            <h1 className="max-w-3xl p-2 text-center text-white md:font-bold">
              AI Built for{" "}
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-center text-transparent">
                cs106a{" "}
              </span>
              Students
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
