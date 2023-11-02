import { useEffect, useState } from "react";
import { Rubik } from "next/font/google";
import clsx from "clsx";
import { useRouter } from "next/router";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

const font = Rubik({
  subsets: ["latin-ext"],
});

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const token = ctx.req.cookies.token;
  const token2 = new Date().getTime().toString();
  ctx.res.setHeader(
    "Set-Cookie",
    `bizToken=${token2}; Domain=.child-poc-iframe.vercel.app; path=/; Secure; HttpOnly; SameSite=None;`,
  );
  if (token)
    return {
      props: {
        token,
      },
    };
  else {
    return {
      props: {},
    };
  }
};

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();
  const [showAccept, setShowAccept] = useState<boolean>(false);
  useEffect(() => {
    document.hasStorageAccess().then((a) => {
      if (!a) setShowAccept(true);
    });
  }, []);
  return (
    <>
      <main className={clsx(font.className, "flex h-screen flex-col p-4")}>
        <h1 className="text-lg">Child Frame</h1>
        {props.token && <p className="text-sm">Cookie Token: {props.token}</p>}
        {showAccept && (
          <button
            className="mt-auto bg-sky-600 py-2 text-white"
            onClick={() => {
              document.requestStorageAccess().then(
                () => {
                  setShowAccept(false);
                  router.reload();
                  console.log("Storage access granted");
                },
                () => {
                  console.log("Storage access denied");
                },
              );
            }}
          >
            Accept Cookies
          </button>
        )}
      </main>
    </>
  );
}
