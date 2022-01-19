import { Button } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { signOut } = useAuth();

  return (
    <>
      <p>Dashboard</p>
      <Button onClick={signOut}>Deslogar</Button>
    </>
  );
};

export default Dashboard;
