import Head from "next/head";
import React from "react";
import { Navbar } from "../ui";
interface Props {
  children?: React.ReactNode;
  title?: string;
}
export function Layout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title || "Pokemon app"}</title>
        <meta name="Author" content="Trei buckets" />
        <meta name="Description" content="Información sobre el pokemon" />
        <meta name="Keywords" content="pokemon,pokedex" />
      </Head>
      <Navbar />
      <main style={{ padding: "0px 20px" }}>{children}</main>
    </>
  );
}
