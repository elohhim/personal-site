import authors from "../../meta/authors.yml";

export type AuthorContent = {
  readonly slug: string;
  readonly name: string;
  readonly introduction: string;
};

const authorMap: { [key: string]: AuthorContent } = generateAuthorMap();

const unknown: AuthorContent = {
  slug: '__unknown__',
  name: '[Unknown]',
  introduction: 'Unknown author'
};

function generateAuthorMap(): { [key: string]: AuthorContent } {
  const result: { [key: string]: AuthorContent } = {};
  for (const author of authors.authors) {
    result[author.slug] = author;
  }
  return result;
}

export function getAuthor(slug: string) {
  return authorMap[slug] ?? unknown;
}
