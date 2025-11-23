export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const backendResponse = await fetch("http://3.236.79.130:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await backendResponse.json();
    return res.status(backendResponse.status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Backend unreachable",
      message: String(error),
    });
  }
}
