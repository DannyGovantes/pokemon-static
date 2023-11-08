import { Grid } from "@nextui-org/react";
import type { GetStaticProps, NextPage } from "next";
import { pokeApi } from "../api";
import { Layout } from "../components";
import { PokemonCard } from "../components/pokemon/PokemonCard";
import { PokemonListInfoResponse, SmallPokemon } from "../interfaces";
interface Props {
  pokemons: SmallPokemon[];
}
const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <>
      <Layout>
        <Grid.Container gap={2} justify="flex-start">
          {pokemons?.map((pokemon) => {
            return <PokemonCard pokemon={pokemon} key={pokemon.id} />;
          })}
        </Grid.Container>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await pokeApi.get<PokemonListInfoResponse>("/pokemon?limit=151");
  const pokeRes = res.data.results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        index + 1
      }.png`,
    };
  });

  return {
    props: {
      pokemons: pokeRes,
    },
  };
};

export default Home;
