import { Link, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";

export function Navbar() {
  const { theme } = useTheme();
  return (
    <>
      <header>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: theme?.colors.gray900.value,
            justifyContent: "space-between",
            padding: "0px 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src={
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
              }
              alt="Icono app"
              width={70}
              height={70}
            />
            <NextLink href={"/"}>
              <Link>
                <Text color="white" h2>
                  P
                </Text>
                <Text color="white" h3>
                  okemon
                </Text>
              </Link>
            </NextLink>
          </div>
          <NextLink href={"/favorites"}>
            <Text color="white">Favoritos</Text>
          </NextLink>
        </nav>
      </header>
    </>
  );
}
