import Head from "next/head";

export default function FaviconMeta() {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=ngjoNjajPo" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=ngjoNjajPo" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=ngjoNjajPo" />
      <link rel="manifest" href="/site.webmanifest?v=ngjoNjajPo" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg?v=ngjoNjajPo" color="#5bbad5" />
      <link rel="shortcut icon" href="/favicon.ico?v=ngjoNjajPo" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}
