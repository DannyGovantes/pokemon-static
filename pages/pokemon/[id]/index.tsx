import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
import { pokeApi } from "../../../api";
import { Layout } from "../../../components";
import { PokemonListInfoResponse } from "../../../interfaces";
import { localFavorites } from "../../../utils";

interface Props {
  pokemon: PokemonListInfoResponse;
}

const Page: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.isOnFavorites(pokemon.id)
  );
  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites((value) => !value);
  };

  return (
    <Layout title={`Pokemon:${pokemon.name}`}>
      <Grid.Container css={{ mt: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default || "no-image"
                }
                alt={pokemon.name}
                width={"100%"}
                height={200}
              />
            </Card.Body>
          </Card>

          <Grid xs={12} sm={8}>
            <Card>
              <Card.Header
                css={{ display: "flex", justifyContent: "space-between" }}
              >
                <Text h1>{pokemon.name}</Text>
                <Button
                  color={"gradient"}
                  ghost={!isInFavorites}
                  onClick={onToggleFavorite}
                >
                  {isInFavorites ? "Favoritos" : "Guardar en favoritos"}
                </Button>
              </Card.Header>
              <Card.Body>
                <Text size={30}>Sprites:</Text>
                <Container direction="row" display="flex">
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.back_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.front_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export default Page;

// Se ejecutan primero los paths
// Se crea en disco duro y puede ser pesado
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
