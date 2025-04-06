let users = [
    { id: 1, username: "admin", password: "1234", bus_number: 101 },
  ];

  let nextId = 2;

  // GET all users
  export async function GET() {
    return Response.json(users);
  }

  // POST create user
  export async function POST(req) {
    try {
      const { username, password, bus_number } = await req.json();

      if (!username || !password || typeof bus_number !== "number") {
        return Response.json({ error: "Invalid input" }, { status: 400 });
      }

      const newUser = {
        id: nextId++,
        username,
        password,
        bus_number,
      };

      users.push(newUser);
      return Response.json(newUser, { status: 201 });
    } catch (error) {
      return Response.json({ error: "Failed to create user" }, { status: 500 });
    }
  }