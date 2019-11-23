import { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = () => {
  const { useAuth } = useContext(AuthContext);
  useEffect(() => {
    useAuth();
  }, []);

  return null;
};

export default ResolveAuthScreen;
