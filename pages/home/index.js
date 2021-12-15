import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import FoodTable from "../../components/FoodTable";

const HomePage = () => {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <div>
                <p>Valharvest Food</p>
                <p>
                    Check out this project repos on Github:
                    <br />
                    <Link
                        href={
                            'https://github.com/Frenvius/valheim-food'
                        }
                    >
                        This Table
                    </Link>
                    <br />
                    <Link
                        href={
                            'https://github.com/Frenvius/valharvest'
                        }
                    >
                        Valhavest mod
                    </Link>
                </p>
                <p>
                    Displays food items from Valharvest mod and their stats. Sort
                    for each stat by clicking the headers. All stats and
                    images were pulled from the Valheim Wiki
                </p>
                <p>Page under construction</p>
                <FoodTable />
            </div>
        </>
    );
}

export default HomePage;