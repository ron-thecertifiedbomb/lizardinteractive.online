"use client";

import BlogGrid from "@/components/blog/BlogGrid/BlogGrid";
import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";

import { blogPageContent } from "@/data/page/blogPageContent";
import { blogArticles } from "@/data/lists/blogArticle";
import MainHeader from "@/components/shared/MainHeader/MainHeader";

export default function BlogPage() {

    // You can keep this if you still want to pull SEO data from blogPageContent, 
    // but we are overriding the title for the new premium header below.
    const headerData = blogPageContent.find(item => item.type === "heading");

    return (
        <>
            <MetaHead pageContent={blogPageContent} />

            <ScreenContainer>

                {/* --- The Reusable Premium Header --- */}
                <MainHeader
                    eyebrow="Technical Writings & Case Studies"
                    headline="The Engineering Blog"
                    subheadline="Deep dives into Next.js architecture, high-performance web development, and the strategies I use to hit guaranteed 100/100 Lighthouse scores."
                />

                <BlogGrid posts={blogArticles} />

            </ScreenContainer>
        </>
    );
}