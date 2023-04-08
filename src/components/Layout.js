import Navbar from "./Navbar";
import { Sticky } from "semantic-ui-react";

export const Layout = ({ children }) => {
  return (
    <>
      <Sticky>
        <Navbar />
      </Sticky>
      {children}
    </>
  );
};
