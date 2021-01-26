import React from "react";
import styles from "public/styles/content.module.css";
import Author from "@/components/Author";
import Copyright from "@/components/Copyright";
import Date_ from "@/components/Date";
import Layout from "@/components/Layout";
import BasicMeta from "@/components/meta/BasicMeta";
import HypothesisMeta from "@/components/meta/HypothesisMeta";
import JsonLdMeta from "@/components/meta/JsonLdMeta";
import OpenGraphMeta from "@/components/meta/OpenGraphMeta";
import TwitterCardMeta from "@/components/meta/TwitterCardMeta";
import ReadTime from "@/components/ReadTime";
import { SocialList } from "@/components/SocialList";
import TagButton from "@/components/TagButton";
import { getAuthor } from "@/lib/authors";
import { getTag } from "@/lib/tags";
import theme from "@/theme";
import { fetchPostContent, fetchPostContentSingle } from "@/lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { MdxRemote } from "next-mdx-remote/types";
import rehypePrism from "@mapbox/rehype-prism";

type Props = {
  title: string;
  date: string;
  slug: string;
  description: string;
  tags: string[];
  author: string;
  renderedOutput: string;
};

export default function Index({
  title,
  date,
  slug,
  description,
  tags,
  author,
  renderedOutput,
}: Props) {
  const keywords = tags.map((it) => getTag(it).name);
  const authorName = getAuthor(author).name;
  const datePublished = new Date(date);
  return (
    <Layout>
      <BasicMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        description={description}
      />
      <TwitterCardMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <OpenGraphMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <JsonLdMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        date={datePublished}
        author={authorName}
        description={description}
      />
      <HypothesisMeta />
      <div className={"container"}>
        <article>
          <header>
            <h1>{title}</h1>
            <div className={"metadata"}>
              <div>
                <Date_ date={datePublished} />
              </div>
              <div>
                <Author author={getAuthor(author)} />
              </div>
              <div>
                <ReadTime minutes={3} />
              </div>
            </div>
          </header>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: renderedOutput }}
          ></div>
          <ul className={"tag-list"}>
            {tags.map((it, i) => (
              <li key={i}>
                <TagButton tag={getTag(it)} />
              </li>
            ))}
          </ul>
        </article>
        <footer>
          <div className={"social-list"}>
            <SocialList />
          </div>
          <Copyright />
        </footer>
      </div>
      <style jsx>
        {`
          .container {
            display: block;
            max-width: 36rem;
            width: 100%;
            margin: 0 auto;
            padding: 0 1.5rem;
            box-sizing: border-box;
          }
          .metadata div {
            display: inline-block;
            margin-right: 0.5rem;
          }
          .metadata div:not(:first-child)::before {
            content: "·";
            text: ${theme.text.light};
            margin-right: 0.5rem;
          }
          article {
            flex: 1 0 auto;
          }
          h1 {
            margin: 0 0 0.5rem;
            font-size: 2.25rem;
          }
          .tag-list {
            list-style: none;
            text-align: right;
            margin: 1.75rem 0 0 0;
            padding: 0;
          }
          .tag-list li {
            display: inline-block;
            margin-left: 0.5rem;
          }
          .social-list {
            margin-top: 3rem;
            text-align: center;
          }

          @media (min-width: 769px) {
            .container {
              display: flex;
              flex-direction: column;
            }
          }
        `}
      </style>
      <style global jsx>
        {`
          /* Syntax highlighting */
          .token.comment,
          .token.prolog,
          .token.doctype,
          .token.cdata,
          .token.plain-text {
            color: #6a737d;
          }

          .token.atrule,
          .token.attr-value,
          .token.keyword,
          .token.operator {
            color: #d73a49;
          }

          .token.property,
          .token.tag,
          .token.boolean,
          .token.number,
          .token.constant,
          .token.symbol,
          .token.deleted {
            color: #22863a;
          }

          .token.selector,
          .token.attr-name,
          .token.string,
          .token.char,
          .token.builtin,
          .token.inserted {
            color: #032f62;
          }

          .token.function,
          .token.class-name {
            color: #6f42c1;
          }

          /* language-specific */

          /* JSX */
          .language-jsx .token.punctuation,
          .language-jsx .token.tag .token.punctuation,
          .language-jsx .token.tag .token.script,
          .language-jsx .token.plain-text {
            color: #24292e;
          }

          .language-jsx .token.tag .token.attr-name {
            color: #6f42c1;
          }

          .language-jsx .token.tag .token.class-name {
            color: #005cc5;
          }

          .language-jsx .token.tag .token.script-punctuation,
          .language-jsx .token.attr-value .token.punctuation:first-child {
            color: #d73a49;
          }

          .language-jsx .token.attr-value {
            color: #032f62;
          }

          .language-jsx span[class="comment"] {
            color: pink;
          }

          /* HTML */
          .language-html .token.tag .token.punctuation {
            color: #24292e;
          }

          .language-html .token.tag .token.attr-name {
            color: #6f42c1;
          }

          .language-html .token.tag .token.attr-value,
          .language-html
            .token.tag
            .token.attr-value
            .token.punctuation:not(:first-child) {
            color: #032f62;
          }

          /* CSS */
          .language-css .token.selector {
            color: #6f42c1;
          }

          .language-css .token.property {
            color: #005cc5;
          }
        `}
      </style>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = fetchPostContentSingle(params.slug[0]);
  const { renderedOutput } = await renderToString(post.content, {
    mdxOptions: {
      rehypePlugins: [rehypePrism],
    },
  });
  return {
    props: {
      ...post,
      renderedOutput,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPostContent().map((post) => ({
    params: {
      slug: [post.slug],
    },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};
