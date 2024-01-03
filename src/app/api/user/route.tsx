import executeQuery from "../../../../databaseConnection";

export type GetUserResponse = {
  isAdmin: boolean;
};

type User = {
  id: number;
  name?: string;
  email: string;
};

export async function PUT(request: Request) {
  const { email } = await request.json();

  const users = (await executeQuery({
    query: "SELECT * FROM users WHERE email = ?",
    values: [email],
  })) as User[];

  if (users && users.length > 0) {
    return Response.json({ isAdmin: true } as GetUserResponse);
  } else {
    return Response.json({ isAdmin: false } as GetUserResponse);
  }
}
