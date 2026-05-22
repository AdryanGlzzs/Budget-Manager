const RestApi = async () => {
  try {
    const response = await fetch("http://localhost:3000");

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
