import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Button from "@memonorepo/button";
import { hello, hello2 } from "@memonorepo/shared";
export default function Home() {
  return (
    <div>
      <Button>THAT IS COOL</Button>
      <h1>{hello}</h1>
      <h1>{hello2}</h1>
    </div>
  );
}
