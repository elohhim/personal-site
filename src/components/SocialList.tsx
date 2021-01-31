import React from "react";
import Twitter from "../assets/twitter-alt.svg";
import GitHub from "../assets/github-alt.svg";
import Linkedin from "../assets/linkedin-alt.svg";
import config from "../lib/config";
import RssLink from "./RssLink";

type SvgComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

interface SocialMedium {
  name: string;
  href: string;
  component: SvgComponent;
  account: string;
}

const socialMedia: SocialMedium[] = [
  {
    name: 'GitHub',
    href: `https://github.com/${config.github_account}`,
    component: GitHub,
    account: config.github_account,
  },
  {
    name: 'Twitter',
    href: `https://twitter.com/${config.twitter_account}`,
    component: Twitter,
    account: config.twitter_account,
  },
  {
    name: 'Linkedin',
    href: `https://linkedin.com/in/${config.linkedin_account}`,
    component: Linkedin,
    account: config.linkedin_account
  }
];

interface SocialLinkProps {
  name: string;
  href: string;
  component: SvgComponent
}

function SocialLink({ name, href, component }: SocialLinkProps) {
  const Component = component;
  return (
    <a
      title={name}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <Component width={24} height={24} fill={"#222"} />
      <style jsx>{`
      a {
        display: inline-block;
      }
      a:not(:last-child) {
        margin-right: 2em;
      }`}
      </style>
    </a>

  );
}

export function SocialList({ }) {
  return (
    <div>
      { socialMedia
        .filter(medium => medium.account)
        .map(medium => <SocialLink key={medium.name} {...medium} />)
      }
      <RssLink></RssLink>
    </div>
  );
}
