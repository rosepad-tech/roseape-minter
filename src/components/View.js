import { Route, Routes } from "react-router";
import styled from "styled-components";
import Collection from "views/Collection";
import Home from "views/Home";

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 8rem auto 0 auto;
`;

export default () => {
  return (
    <Container>
      <Routes>
        <Route index element={<Home />} />
        <Route path="collection" element={<Collection />}></Route>
      </Routes>
    </Container>
  );
};
