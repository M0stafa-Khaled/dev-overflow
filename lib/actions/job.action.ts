"use server";
export const fetchLocation = async () => {
  const response = await fetch("http://ip-api.com/json/?fields=country");
  const location = await response.json();
  return location.country;
};

export const fetchJobs = async (filters: JobFilterParams) => {
  const { query, page } = filters;

  const url = `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}&date_posted=all`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);

  const result = await response.json();

  return result.data;
};
