const url = "https://randomuser.me/api/?results=50";
const getUsers = async () => {
  try {
    const promiseResponse = await fetch(url);
    if (!promiseResponse.ok) {
      throw new Error(`HTTP ERROR!! code : ${promiseResponse.status}`);
    }
    const data = await promiseResponse.json();
    const { results } = data;
    return results.map((user) => {
      const {
        location: { country },
        name: { first, last },
      } = user;
      return { country: country, name: first + " " + last };
    });
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error occurred:", error);
    }
  }
};

export default getUsers;
