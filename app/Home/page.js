import Head from "next/head";
import dynamic from "next/dynamic";


const Banner = dynamic(() => import("../(pages)/HomePage/Banner"));
const NewRelease = dynamic(() => import("../(pages)/HomePage/NewRelease"));
const BecomeAuthor = dynamic(() => import("../(pages)/HomePage/BecomeAuthor"));
const PopularNovels = dynamic(() => import("../(pages)/HomePage/PopularNovels"));
const NovelByGenre = dynamic(() => import("../(pages)/HomePage/NovelByGenre"));
const FeaturedBook = dynamic(() => import("../(pages)/HomePage/FeaturedBook"));
const Popular = dynamic(() => import("../(pages)/HomePage/Popular"));
const Originals = dynamic(() => import("../(pages)/HomePage/Originals"));
const LatestUpdate = dynamic(() => import("../(pages)/latest-update/page"));
const Ranking = dynamic(() => import("../(pages)/HomePage/Ranking"));
const Annoucment = dynamic(() => import("../(pages)/HomePage/Annoucment"));

async function HomePage() {

    return (
        <>
            <Head>
                <meta property="og:title" content="Jade scroll" />
                <meta name="og:description" content="Jade scroll novels home page" />
            </Head>
            <div className='pt-[65px]'>
                {/* <Banner /> */}
                <Annoucment />
                <div>
                    <NewRelease />
                </div>
                {/* <BecomeAuthor /> */}

                <PopularNovels />

                {/* <NovelByGenre  /> */}
                <FeaturedBook />
                <Popular />
                <Originals />
                <LatestUpdate />
                <div className="hidden lg:block">
                    <Ranking />
                </div>
            </div>
        </>
    );
}

export default HomePage;
