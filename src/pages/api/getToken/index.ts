import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

type ResponseData = {
  location?: string;
  message?: string;
};

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
  origin: "https://parent-poc-iframe.vercel.app",
  credentials: true,
  allowedHeaders: ["Content-Type"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: typeof cors,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Allowed" });
  await runMiddleware(req, res, cors);
  res.setHeader(
    "Set-Cookie",
    `token=${new Date()
      .getTime()
      .toString(
        36,
      )}; Domain=.child-poc-iframe.vercel.app; path=/redirected; Secure; HttpOnly; SameSite=None;`,
  );
  res.setHeader(
    "Set-Cookie",
    `location=${new Date()
      .getTime()
      .toString(
        36,
      )}; Domain=.child-poc-iframe.vercel.app; path=/redirected; Secure; HttpOnly; SameSite=None;`,
  );
  res
    .status(200)
    .send({ location: "https://child-poc-iframe.vercel.app/redirected" });
}
