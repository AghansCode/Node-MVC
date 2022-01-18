const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Greeting</title><head>");
    res.write('<body><h2>Happy 2022</h2><br/><br/><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Users</title><head>");
    res.write("<body><ul><li>User 1</li></ul></body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("user.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
      console.log(message);
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title><head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
