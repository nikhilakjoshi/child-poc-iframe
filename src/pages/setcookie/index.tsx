import type { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  ctx.res.setHeader(
    "Set-Cookie",
    "token=looskod; Domain=.child-poc-iframe.vercel.app; path=/home; Secure; HttpOnly; SameSite=None;",
  );
  return {
    redirect: {
      destination: "https://parent-poc-iframe.vercel.app/home",
      permanent: true,
    },
  };
};
export default function SetCookie() {
  return (
    <>
      <h1>Set Cookie</h1>
    </>
  );
}
