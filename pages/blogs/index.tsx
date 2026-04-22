"use client";

import BlogGrid from "@/components/blog/BlogGrid/BlogGrid";
import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { blogPageContent } from "@/data/page/blogPageContent";
import { blogArticles } from "@/data/lists/blogArticle";

export default function BlogPage() {
    // Dynamic extraction for the SectionHeader
    const headerData = blogPageContent.find(item => item.type === "heading");
    const subData = blogPageContent.find(item => item.type === "paragraph");

    return (
        <>
            <MetaHead pageContent={blogPageContent} />

            <ScreenContainer className="pt-16 md:pt-10">
                <SectionHeader
                    title={headerData?.content || "Daily"}
                    highlight={headerData?.highlight || "Blogs"}
                    // description={subData?.content || ""}
                />

     
                    <BlogGrid posts={blogArticles} />
             
            </ScreenContainer>
        </>
    );
}