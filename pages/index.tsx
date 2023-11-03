import { Button } from "@nextui-org/react";
import type { GetStaticProps, NextPage } from "next";
import { pokeApi } from "../api";
import { Layout } from "../components";

const Home: NextPage = ({ pokemons }) => {
  return (
    <>
      <Layout>
        <Button color={"gradient"}>hello</Button>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await pokeApi.get("/pokemon?limit=151");

  return {
    props: {
      pokemons: res.data.results,
    },
  };
};

export default Home;
