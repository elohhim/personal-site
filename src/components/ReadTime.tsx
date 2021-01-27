import theme from "../styles/theme";

type Props = {
  minutes: number;
};

export default function ReadTime({ minutes }: Props) {
  const rounded = Math.round(minutes);
  return (
    <>
      <span>
        {rounded} {rounded === 1 ? "minute" : "minutes"} read
      </span>
      <style jsx>{`
        span {
          color: ${theme.text.light};
        }
      `}</style>
    </>
  );
}
