"use client";

import Head from "next/head";
import BoxShadowGenerator from "../../components/BoxShadowGenerator/BoxShadowGenerator";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import UtilityContainer from "../../components/shared/UtilityComponent/UtilityComponent";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";


export default function BoxShadowGeneratorPage() {
    return (
        <>
            <Head>
                <title>Box Shadow Generator | Lizard Interactive Online</title>
                <meta
                    name="description"
                    content="Generate CSS box-shadow values visually with live preview."
                />
            </Head>
<ScreenContainer>
            <SectionHeader
                title="Box Shadow Generator"
                subtitle="Create CSS box-shadow styles with live preview"
                className="  md:mt-4 lg:mt-6"
            />

            {/* ⭐ Wrapped the generator inside your global utility container */}

            <BoxShadowGenerator />
           </ScreenContainer>
        </>
    );
}
