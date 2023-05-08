const postData = async (url, postData) => {
  console.log(postData);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
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

export default postData;
