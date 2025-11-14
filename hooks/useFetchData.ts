export const useFetchData = () => {

    const data = fetch("http://localhost:8080/api/blogs")
      
    .then((response) => {
      // Check if the response was successful (e.g., HTTP status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the response body as JSON
      return response.json();
    })
    .then((data) => {
      // Work with the parsed data
console.log('Fetched data', data)
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch or parsing
      console.error("Error fetching data:", error);
    });
  return data;
};
