import Head from "next/head";

import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import Planner from "../../components/Planner/Planner";


export default function PlannerPage() {
    return (
        <>
            <Head>
                <title>Planner | Lizard Interactive Online</title>
            </Head>


            <SectionHeader
                title="Planner"
                subtitle="Organize and manage your tasks efficiently."
            />




            <Planner />

        </>
    );
}
