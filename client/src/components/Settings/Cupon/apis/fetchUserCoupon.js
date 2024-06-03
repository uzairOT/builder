
const fetchUserCoupons = async (getUserCoupons, userId) => {
      try {
          const result = await getUserCoupons({ userId: userId}).unwrap();
          console.log("User coupons:", result);
        } catch (error) {
          console.error("Failed to fetch user coupons:", error);
        }
return{}
}

export {fetchUserCoupons}