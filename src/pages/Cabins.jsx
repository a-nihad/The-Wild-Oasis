import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable.jsx";
import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row";
import Button from "../ui/Button.jsx";
import CreateCabinForm from "../features/cabins/CreateCabinForm.jsx";
import AddCabin from "../features/cabins/AddCabin.jsx";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
