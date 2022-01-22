import { Grid } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { ProductCard } from "../../components/ProductCard";
import { useProducts } from "../../contexts/ProductsContext";

const Dashboard = () => {
  const { products } = useProducts();

  console.log(products);

  return (
    <>
      <Header></Header>

      <Grid
        w="90%"
        templateColumns="repeat(auto-fill, minmax(290px, 1fr))"
        gap={10}
        pX="8px"
        justifyItems="center"
        justifyContent="center"
        m="10px auto"
        p="30px"
      >
        {products.map((item) => (
          <ProductCard products={item} />
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
