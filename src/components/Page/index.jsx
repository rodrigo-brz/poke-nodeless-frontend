import { Container } from "react-bootstrap";
import MyCard from "../Card";

function Page({ title, children }) {
  return (
    <Container className="mt-4">
      <MyCard title={title}>{children}</MyCard>
    </Container>
  );
}

export default Page;
