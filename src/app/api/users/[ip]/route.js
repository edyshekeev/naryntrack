let users = [
    { id: 1, username: "admin", password: "1234", bus_number: 101 },
  ];

  export async function GET(req, { params }) {
    const id = parseInt(params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(user);
  }

  export async function PUT(req, { params }) {
    const id = parseInt(params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const { username, password, bus_number } = await req.json();

    if (!username || !password || typeof bus_number !== "number") {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    users[index] = { id, username, password, bus_number };
    return Response.json(users[index]);
  }

  export async function DELETE(req, { params }) {
    const id = parseInt(params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const deletedUser = users.splice(index, 1)[0];
    return Response.json(deletedUser);
  }