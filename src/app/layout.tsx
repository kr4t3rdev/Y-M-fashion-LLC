import type { Metadata } from "next";
import { Archivo, Newsreader, JetBrains_Mono } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { uploadRouter } from "@/server/uploadthing/router";
import "@uploadthing/react/styles.css";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Y&M Fashion LLC — Archivo de moda",
    template: "%s | Y&M Fashion LLC",
  },
  description:
    "El archivo curado de Y&M Fashion LLC. Moda, belleza, telefonía y aseo, fichados con intención.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${archivo.variable} ${display.variable} ${mono.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t;try{t=localStorage.getItem("theme")}catch(e){}var c="light";if(t==="dark"||t==="light"||t==="street"){c=t}document.documentElement.classList.add(c);if(c!=="light"&&window.matchMedia){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/*
          THESIS: Y&M Fashion es el archivo de un curador — el inventario heterogéneo
          (moda, belleza Mary Kay, telefonía, accesorios, aseo) fichado como piezas
          numeradas y etiquetadas, no como estantes de supermercado. Rehúsa la home-hero
          genérica: la primera viewport abre el archivo y te muestra fichas.
          OWN-WORLD: paleta hueso+tinta con acento teal (light/dark) y lime saturado
          (street); marca condensada Archivo, serif Newsreader para editorial, mono
          JetBrains para sku/precio/stock; etiquetas retail-tag, líneas hairline,
          numeración de inventario.
          STORY: el visitante entiende que cada pieza fue elegida; llega al catálogo y
          a las ofertas viendo el archivo, no un slider de banners.
          FIRST VIEWPORT: cabecera condensada con marca + rail de etiquetas; hero con
          pieza editorial a gran escala y nº de edición; fichas de categorías
          numeradas 01–05; rail de piezas en formato ficha con price-tag mono.
          FORM: «El archivo del curador» (candidato 5 grounded), seed 91f8e203.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the
          finish review, the verdict, and DESIGN.md.
        */}
        <NextSSRPlugin routerConfig={extractRouterConfig(uploadRouter)} />
        {children}
      </body>
    </html>
  );
}
