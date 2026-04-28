export default async function handler(req, res) {
  try {
    const target = process.env.TARGET_DOMAIN;

    const url = new URL(req.url, target);

    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    });

    const body = await response.arrayBuffer();

    res.status(response.status);

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.send(Buffer.from(body));
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
}
