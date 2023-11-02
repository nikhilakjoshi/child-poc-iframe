import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [showAccept, setShowAccept] = useState<boolean>(false);
  useEffect(() => {
    document.hasStorageAccess().then((a) => {
      if (!a) setShowAccept(true);
    });
  }, []);
  return (
    <>
      <h1>Child Home</h1>
      {showAccept && (
        <button
          onClick={() => {
            document.requestStorageAccess().then(
              () => {
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
    </>
  );
}
