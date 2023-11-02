import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Rubik } from "next/font/google";
import clsx from "clsx";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

const font = Rubik({
  subsets: ["latin-ext"],
});

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const token = ctx.req.cookies.token;
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
        {props.token && <p className="text-sm">Cookit Token: {props.token}</p>}
        {showAccept && (
          <button
            className="mt-auto bg-sky-600 py-2 text-white"
            onClick={() => {
              document.requestStorageAccess().then(
                () => {
                  setShowAccept(false);
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
