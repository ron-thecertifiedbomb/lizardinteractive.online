"use client";

import BlogGrid from "@/components/blog/BlogGrid/BlogGrid";
import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { specialLogs } from "@/data/lists/blogList";
import { blogContent } from "@/data/page/blogContent";

export default function BlogPage() {
    const featuredLogs = Object.values(specialLogs);

    // DYNAMIC EXTRACTION: Pull the data from your uniform blogContent array
    const headerData = blogContent.find(item => item.type === "heading");
    const subData = blogContent.find(item => item.type === "paragraph");

    return (
        <>
            {/* MetaHead consumes the array directly */}
            <MetaHead pageContent={blogContent} />

            <ScreenContainer variant="dark" maxWidth="xl" className="overflow-x-hidden">
                <SectionHeader
                    // Now consuming from blogContent.ts
                    title={headerData?.content || "Daily"}
                    highlight={headerData?.highlight || "Blogs"}
                    description={subData?.content || ""}
                />

     

                    {/* Passing your featuredLogs to the grid */}
                    <BlogGrid posts={featuredLogs} />
            

            </ScreenContainer>
        </>
    );
}