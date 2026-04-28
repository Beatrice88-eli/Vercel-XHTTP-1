export default async function handler(req, res) {
  const target = process.env.TARGET_DOMAIN;
  if (!target) {
    return res.status(500).send("TARGET_DOMAIN not set");
  }

  const url = new URL(req.url, target);

  const response = await fetch(url, {
    method: req.method,
    headers: req.headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
  });

  const data = await response.arrayBuffer();

  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  res.send(Buffer.from(data));
}
