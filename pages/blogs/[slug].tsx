import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import distanceToNow from "../../lib/dateRelative";
import { useEffect, useState } from "react";
import createDOMPurify from "dompurify";

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function PostPage({ blog }: { blog: BlogPost }) {
  const router = useRouter();

  if (!router.isFallback && !blog) {
    return <ErrorPage statusCode={404} />;
  }

  // Sanitization handled only on client
  const [safeHTML, setSafeHTML] = useState(blog.content);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const DOMPurify = createDOMPurify(window);
      setSafeHTML(DOMPurify.sanitize(blog.content));
    }
  }, [blog.content]);

  return (
    <Container>
      <article className="mb-6 text-white pb-4">
        <h2 className="text-xl lg:text-3xl font-bold">{blog.title}</h2>

        <div
          className="mt-2 text-sm lg:text-base font-light"
          dangerouslySetInnerHTML={{ __html: safeHTML }}
        />
      </article>
    </Container>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const url = process.env.GET_ALL_BLOGS_URL;

  try {
    const res = await fetch(`${url}/${params.slug}`);

    if (!res.ok) return { notFound: true };

    const blog: BlogPost = await res.json();

    return {
      props: { blog },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  const url = process.env.GET_ALL_BLOGS_URL;
  const res = await fetch(url);
  const blogs: BlogPost[] = await res.json();

  return {
    paths: blogs.map((b) => ({ params: { slug: b._id } })),
    fallback: true,
  };
}
