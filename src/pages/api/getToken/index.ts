import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

type ResponseData = {
  message: string;
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
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });
  await runMiddleware(req, res, cors);
  res.redirect(308, "https://child-poc-iframe.vercel.app/redirected");
}
