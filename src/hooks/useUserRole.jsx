import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export const useUserRole = () => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(""); 

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch(`https://savvy-academy-server.vercel.app/users/${user.email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user role"); // Handle non-200 responses
        }
        const data = await response.json();
        setRole(data.role); // Assuming the role property is in the response data
      } catch (error) {
        setError(error); // Store error for handling
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or error
      }
    };

    // Fetch user role only if user and loading state have changed (prevents unnecessary re-fetches)
    if (user && !loading) {
      fetchUserRole();
    }
  }, [user, loading]); // Dependency array for useEffect

  return { isLoading, role, error };
};

export default useUserRole;