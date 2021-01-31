import RssIcon from "@/assets/rss-alt.svg";

export default function RssLink() {
    const href = `/feed.xml`;
    return (
    <a title="RSS feed" href={href} target="_blank">
      <RssIcon width={24} height={24} fill={"#222"} />
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
