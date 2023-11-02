import type { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  ctx.res.setHeader("Set-Cookie", "name=Mike; domain=localhost:3001; path=/;");
  return {
    redirect: {
      destination: "http://localhost:3000/home",
      permanent: true,
    },
  };
};
export default function SetCookie() {
  return (
    <>
      <h1>Set Cookie</h1>
      <p>
        <a href="/">Back to Home</a>
      </p>
    </>
  );
}
