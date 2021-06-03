import "normalize.css";
import { Loguin } from "./class/Loguin";
import { ProductPage } from "./class/ProductPage";
(globalThis as any).Loguin = Loguin;
(globalThis as any).Page = ProductPage;
