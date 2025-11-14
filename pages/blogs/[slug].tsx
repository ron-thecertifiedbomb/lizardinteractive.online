import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import { useEffect, useState } from "react";
import createDOMPurify from "dompurify";
import Head from "next/head";

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function PostPage({ blog }: { blog?: BlogPost }) {
  const router = useRouter();

  // Show fallback loading state
  if (router.isFallback) {
    return (
      <Container>
        <p className="text-white">Loading...</p>
      </Container>
    );
  }

  // If blog not found
  if (!blog) {
    return <ErrorPage statusCode={404} />;
  }

  // Safe HTML sanitization
  const [safeHTML, setSafeHTML] = useState(blog.content || "");

  useEffect(() => {
    if (typeof window !== "undefined" && blog?.content) {
      const DOMPurify = createDOMPurify(window);
      setSafeHTML(DOMPurify.sanitize(blog.content));
    }
  }, [blog?.content]);

  return (
    <Container>
      <Head>
        <title>{blog.title}</title>
      </Head>

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

  try {
    const res = await fetch(url);
    const blogs: BlogPost[] = await res.json();

    return {
      paths: blogs.map((b) => ({ params: { slug: b._id } })),
      fallback: true, // will show fallback page for new blogs
    };
  } catch (error) {
    console.error("Error fetching blogs for paths:", error);
    return { paths: [], fallback: true };
  }
}
