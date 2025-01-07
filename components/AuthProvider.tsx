import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Session = {
  token: string;
} | null;

export const AuthContext = React.createContext<{
  user: Session;
  signIn: (username: string) => void;
  signOut: () => void;
}>(null as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = router.pathname;
  const [user, setUser] = useState<Session>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const path = router.pathname;
    if (path.includes("notes") && !user?.token && ready) router.push("/");
  }, [user, ready, pathname]);

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem("session") || "");
      if (session && session?.token) {
        setUser(session);
      }
    } catch (error) {
      console.log("🚀 ~ useEffect ~ error:", error);
    }
    setReady(true);
  }, []);

  const signIn = (token: string) => {
    setUser({ token });
    localStorage.setItem("session", JSON.stringify({ token }));
    router.push("/notes");
  };

  const signOut = () => {
    setUser(null);
    localStorage.setItem("session", JSON.stringify(null));
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
