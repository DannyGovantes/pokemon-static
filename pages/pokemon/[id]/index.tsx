import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { pokeApi } from "../../../api";
import { Layout } from "../../../components";
import { PokemonListInfoResponse } from "../../../interfaces";

interface Props {
  pokemon: PokemonListInfoResponse;
}

const Page: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter();

  return (
    <Layout>
      <h1>{pokemon.name}</h1>
    </Layout>
  );
};

export default Page;

// Se ejecutan primero los paths
export const getStaticPaths: GetStaticPaths = async (context) => {
  const pokemons = [...Array(151)].map((_, index) => {
    return `${index + 1}`;
  });
  return {
    paths: pokemons.map((id) => ({ params: { id } })),
    fallback: false,
  };
};

// se ejecutan después los props
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };
  const { data } = await pokeApi.get<PokemonListInfoResponse>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};
