const config = require("../../config.json");
const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");
const renderToString = require("next-mdx-remote/render-to-string");

const postsDirectory = path.join(process.cwd(), "content/posts");

function indent(str, level = 1) {
  return str
    .split("\n")
    .map((line) => `${"  ".repeat(level)}${line}`)
    .join("\n");
}

function getRssItemXml(post) {
  const link = `${config.base_url}/posts/${post.slug}`;
  const description = post.content.substring(0, 400);
  return `<item>
  <title><![CDATA[ ${post.title} ]]></title>
  <link>${link}</link>
  <pubDate>${post.date.toUTCString()}</pubDate>
  <guid isPermaLink="true">${link}</guid>
  <description>
    <![CDATA[ ${description}... ]]>
  </description>
</item>`;
}

function getRssFeedXml(posts) {
  const lastBuildDate = posts.reduce((acc, post) =>
    Date.parse(post.date) > Date.parse(acc.date) ? post : acc
  ).date;
  const itemsXml = posts.map((post) => getRssItemXml(post)).join("\n");
  return `<?xml version="1.0" ?>
<rss
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  version="2.0">
  <channel>
    <title><![CDATA[ ${config.site_title} ]]></title>
    <link>${config.base_url}</link>
    <description>
      <![CDATA[ ${config.site_description} ]]>
    </description>
    <image>
      <url>${config.base_url}/feed.png</url>
      <title><![CDATA[ ${config.site_title} ]]></title>
      <link>${config.base_url}</link>
    </image>
    <language>en</language>
    <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
    <atom:link href="${config.base_url}/feed.xml"
               rel="self" type="application/rss+xml" />
${indent(itemsXml, 2)}
  </channel>
</rss>`;
}

async function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  return Promise.all(
    fileNames
      .filter((it) => it.endsWith(".mdx"))
      .map(async (fileName) => {
        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const file = fs.readFileSync(fullPath, "utf8");
        const frontmatter = matter(file);
        const source = await renderToString(frontmatter.content);
        return {
          ...frontmatter.data,
          content: source.renderedOutput,
        };
      })
  );
}

async function generateFeed() {
  const posts = (await getPosts()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() // newest first
  );
  fs.writeFileSync("./public/feed.xml", getRssFeedXml(posts));
}

generateFeed();
