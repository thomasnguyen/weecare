export default async (req, res) => {
  const { id, entity } = req.query;
  const apiUrl = `https://itunes.apple.com/lookup?id=${id}&entity=${entity}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  res.status(200).json(data);
};
