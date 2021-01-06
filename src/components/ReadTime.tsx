import theme from "../styles/theme";

type Props = {
  minutes: number;
};

export default function ReadTime({ minutes }: Props) {
  return (
    <>
      <span>
        {minutes} {minutes === 1 ? "minute" : "minutes"} read
      </span>
      <style jsx>{`
        span {
          color: ${theme.text.light};
        }
      `}</style>
    </>
  );
}
