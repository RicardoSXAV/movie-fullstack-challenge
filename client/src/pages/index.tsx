import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Movies App</title>
      </Head>

      <div>
        <Navbar />
      </div>
    </>
  );
};

export default Home;
