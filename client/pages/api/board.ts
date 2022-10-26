import { NextApiResponse, NextApiRequest } from "next";

type ConnectionInfo = {
  id: number;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ConnectionInfo>
) {
  return res.status(200).json({
    id: 400,
  });
}
