import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Container from "../../components/container";
import distanceToNow from "../../lib/dateRelative";
import { getAllPosts } from "../../lib/getPost";

export default function NotePage({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      {allPosts.length ? (
        allPosts.map((post) => (
          <article key={post.slug} className="mb-6 text-white">
            <Link
              as={`/posts/${post.slug}`}
              href="/posts/[slug]"
              className=" text-lg lg:text-3xl leading-6 font-bold  text-white"
            >
              {post.title}
            </Link>
            <p className="mt-2 text-sm lg:text-lg font-extralight">{post.excerpt}</p>
            <div className="text-xs lg:text-sm text-gray-400 font-extralight mt-2">
              <time>{distanceToNow(new Date(post.date))}</time>
            </div>
          </article>
        ))
      ) : (
        <p>No blog posted yet :/</p>
      )}
    </Container>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["slug", "title", "excerpt", "date"]);

  return {
    props: { allPosts },
  };
}
