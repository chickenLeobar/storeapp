export interface IOptErrorTailer {
  class: string;
  research?: number;
}

import swal, { SweetAlertOptions } from "sweetalert2";

enum LMessage {
  DEBUG = 10,
  INFO = 20,
  SUCCESS = 25,
  WARNING = 30,
  ERROR = 40,
}

export class Messsages {
  opt: IOptErrorTailer;
  constructor(opt: IOptErrorTailer) {
    opt.class = opt.class || "error";
    opt.research = opt.research || 10;
    this.opt = opt;
  }
  public recolect(): string[] {
    /**
     *
     * Level Constant	Value
     */
    let messages = [];
    let bt$ = document.getElementsByClassName(this.opt.class);
    let taget = Object.assign([], bt$)[0];
    if (taget) {
      let newtaget = taget as HTMLElement;
      let icon = "" as SweetAlertOptions["icon"];
      switch (Number(newtaget.dataset.level)) {
        case LMessage.SUCCESS:
          icon = "success";
          break;
        case LMessage.ERROR:
        case LMessage.WARNING:
          icon = "error";
          break;
        default:
          icon = "success";
      }
      swal.fire({
        text: newtaget.dataset.error,
        icon: icon,
      });
    }
    // Object.assign([], bt$).forEach((node: HTMLElement) => {
    //   console.log();
    //   messages.push(node.dataset.error);
    // });
    // console.log("by");

    // if (messages.length == 0) {
    //   console.log("research");
    //   setTimeout(() => {
    //     console.log("enter");
    //     this.recolect();
    //   }, 500);
    // }
    return messages;
  }
}
