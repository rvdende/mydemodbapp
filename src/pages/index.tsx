import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { NewPostForm } from "~/components/newpostform";
import { api } from "~/utils/api";

export default function Home() {
  const initdb = api.example.initdb.useMutation();

  const listposts = api.example.listposts.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <button
          onClick={() => {
            initdb.mutate(undefined, {
              onSuccess: (data) => {
                console.log(data);
              },
            });
          }}
        >
          Init DB
        </button>

        <NewPostForm />

        {listposts.data?.posts.map((post) => (
          <div key={post.id} className="rounded bg-blue-500 p-4 text-white">
            <span className="text-2xl font-bold">{post.title}</span>
            <p>{post.content}</p>
          </div>
        ))}
      </main>
    </>
  );
}
