import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthState {
  accessToken: string;
  user: User;
}

interface User {
  email: string;
  id: string;
  name: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  accessToken: string;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {

  const navigate = useNavigate()

  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@Kb:accessToken");
    const user = localStorage.getItem("@Kb:user");

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post("/login", { email, password });

    const { accessToken, user } = response.data;

    localStorage.setItem("Kb:accessToken", accessToken);
    localStorage.setItem("Kb:user", JSON.stringify(user));

    setData({ accessToken, user });
    navigate('/dashboard')
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("Kb:accessToken");
    localStorage.removeItem("Kb:user");
    
    setData({} as AuthState);
    navigate('/')
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken: data.accessToken, user: data.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
