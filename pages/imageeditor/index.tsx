"use client";

import Head from "next/head";
import ImageEditor from "../../components/ImageEditor/ImageEditor";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";

export default function ImageToTextPage() {
    return (
        <>
            <Head>
                <title>Image Editor | Lizard Interactive Online</title>
            </Head>

                <SectionHeader
                    title="Image Editor"
                    subtitle="Edit and enhance your images with our powerful online image editor."
                />

           
                    <ImageEditor />
         
      
        </>
    );
}
