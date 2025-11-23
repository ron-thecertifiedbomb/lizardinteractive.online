"use client";

import Head from "next/head";
import BoxShadowGenerator from "../../components/BoxShadowGenerator/BoxShadowGenerator";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";

export default function BoxShadowPage() {
    return (
        <>
            <Head>
                <title>Box Shadow Generator | Lizard Interactive Online</title>
                <meta
                    name="description"
                    content="Generate CSS box-shadow values visually with live preview."
                />
            </Head>

            <SectionHeader
                title="Box Shadow Generator"
                subtitle="Create CSS box-shadow styles with live preview"
            />

            <div className="max-w-4xl mx-auto p-4">
                <BoxShadowGenerator />
            </div>
        </>
    );
}
