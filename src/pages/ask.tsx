import { Layout } from "@/components/layout";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";
import Typed from "react-typed";
import { Button } from "@/components/primative/button";
import { useState } from "react";

const Home: NextPage = () => {
  const [q, setQ] = useState<string>("");
  const [qs, setQs] = useState<string[]>([]);

  // console.log(qs);
  const onFormSubmit = (e) => {
    e.preventDefault();
    setQs([...qs, q]);
    setQ("");
  };

  return (
    <Layout>
      <div className="flex max-h-screen w-screen flex-col items-center">
        <div className="mx-8 flex w-full max-w-6xl flex-col items-center justify-center border-x border-zinc-800 px-8 ">
          <div className="flex-col-reversed">
            {qs.map((q, i) => (
              <Result key={i} question={q} />
            ))}
          </div>
          <div className="w-full py-4" />
          <form
            onSubmit={onFormSubmit}
            className="sticky bottom-8 flex w-full max-w-4xl flex-row items-center justify-between"
          >
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-deepblue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                onChange={(e) => setQ(e.target.value)}
                value={q}
                type="search"
                id="default-search"
                className="block w-full rounded-lg border border-gray-300 bg-white p-4 pl-10 text-sm text-gray-900 focus:border-zinc-800 focus:ring-white "
                placeholder="How do I split a string?"
                required
              />
              <button
                type="submit"
                className="absolute right-2.5 bottom-2.5 rounded-lg bg-deepblue  px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-white "
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

const Result: React.FC<{ question: string }> = ({ question }) => {
  const answer = api.ask.answer.useQuery({
    question: question,
  });

  const source = api.ask.sources.useQuery({
    question: question,
  });

  // source.data && console.log(source.data[0][0].metadata.source);
  source.data && console.log(source.data);
  return (
    <div className="mx-2 w-full  max-w-4xl border-zinc-800 p-4 text-white">
      <div className="text-xl font-bold md:text-2xl lg:text-3xl">
        {question}
      </div>
      <div className="py-1" />
      <div className="text-sm font-thin md:text-base lg:text-lg">
        {answer.data ? answer.data.text : "Loading..."}
      </div>
      <div className="mt-2 flex flex-row-reverse">
        {/*  This is where the source gets rendered */}

        {source.data ? (
          <Button variant="link" size="sm">
            <a target="_blank" href={source.data[0][0].metadata.source}>
              Source
            </a>
          </Button>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};
