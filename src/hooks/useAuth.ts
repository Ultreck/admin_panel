// import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading, setLoading };
};