export async function fetchDataFromAPI(API_URL) {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}
