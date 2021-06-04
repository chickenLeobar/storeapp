import swal from "sweetalert2";
import { Messsages } from "../libs/Errortailer";
export class ProductPage {
  constructor() {
    // if (document.getElementById("errors")) {
    //   let errors = JSON.parse(document.getElementById("errors").textContent);
    //   console.log(errors);
    // }
    let msg = new Messsages({ class: "error" });

    let messages = msg.recolect();
    // console.log("loades");
    // console.log(messages);
    // if (messages.length > 0) {
    //   swal.fire({
    //     title: "aviso",
    //     text: messages[0],
    //     icon: "success",
    //   });
    // }
  }
}
