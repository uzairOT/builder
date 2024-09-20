
const fetchUserCoupons = async (apiFetch, data) => {
      try {
          const result = await apiFetch(data).unwrap();
          // console.log("result:", result);
        } catch (error) {
          console.error("Failed to fetch:", error);
        }
return{}
}

export {fetchUserCoupons}