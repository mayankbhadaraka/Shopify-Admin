const FetchData = async (url) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status !== 200) {
      const error = new Error(res.error);
      throw error;
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export default FetchData;
