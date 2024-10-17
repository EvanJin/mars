import ora from "ora";
import { ISpinnerOption } from "@/src/types/common";

export default class Spinner {
  static create(option: ISpinnerOption) {
    return ora({
      text: option.text,
      isSilent: option.silent ?? false,
    });
  }
}
