import { GetStaticPaths, GetStaticProps } from 'next';
import { specialLogs } from '../../data/blogContent';

// ... standard imports (specialLogs, ScreenContainer, etc.)

import { HardwareLayout } from "../../components/blog/HardwareLayout/HardwareLayout";
import { ProductionLayout } from "../../components/blog/ProductionLayout/ProductionLayout";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";

export default function BlogPostDetail({ post }: { post: any }) {
  if (!post) return <div>404_NULL</div>;

  const renderLayout = () => {
    switch (post.layoutType) {
      case 'PRODUCTION': return <ProductionLayout content={post.content} />;
      case 'HARDWARE': return <HardwareLayout content={post.content} />;
      default: return <ProductionLayout content={post.content} />; // Fallback
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <ScreenContainer variant="dark" maxWidth="xl">
        <div className="max-w-4xl mx-auto pt-32 pb-40 px-6">

          {/* Unified Header */}
          <div className="border-b border-zinc-900 pb-12 mb-20">
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-8">
              {post.content.header.title}
            </h1>
            <p className="text-zinc-500 border-l-2 border-emerald-500 pl-6 uppercase tracking-widest text-sm">
              {post.content.hooks.intro}
            </p>
          </div>

          {/* DYNAMIC RENDERER CALL */}
          {renderLayout()}

          {/* Unified Footer */}
          <div className="mt-40 pt-20 border-t border-zinc-900 text-center font-mono text-[10px] text-zinc-700 tracking-[0.5em]">
            {post.content.hooks.conclusion}
          </div>
        </div>
      </ScreenContainer>
    </div>
  );
}
// ... getStaticPaths & getStaticProps

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(specialLogs).map((slug) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = specialLogs[params?.slug as string] || null;
  return { props: { post } };
};