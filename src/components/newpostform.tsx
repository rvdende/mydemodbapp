import { useState } from "react";
import { api } from "~/utils/api";

export function NewPostForm() {
  const [title, title_set] = useState("");
  const [content, content_set] = useState("");
  const create_post = api.example.createpost.useMutation();
  const listposts = api.example.listposts.useQuery();

  return (
    <section className="flex flex-col gap-4 rounded-lg border bg-gray-300 p-4">
      title:
      <input
        value={title}
        onChange={(e) => {
          title_set(e.target.value);
        }}
        className="rounded border"
      />
      content:
      <textarea
        value={content}
        onChange={(e) => {
          content_set(e.target.value);
        }}
        className="rounded border"
      />
      <button
        className="rounded border bg-blue-500 px-2 hover:bg-blue-400"
        onClick={() => {
          create_post.mutate(
            { title, content },
            {
              onSuccess: () => {
                listposts.refetch().catch(console.error);
              },
            }
          );
        }}
      >
        CREATE POST
      </button>
    </section>
  );
}
