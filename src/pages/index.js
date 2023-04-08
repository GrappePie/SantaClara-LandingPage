import { Grid, GridColumn } from "semantic-ui-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <video
            src="/SantaClara.mp4"
            autoPlay
            loop
            muted
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              maxWidth: "100vw",
              objectFit: "cover",
              transform: "translate(-50%,-46%)",
              zIndex: "-1",
            }}
          ></video>
  );
}
