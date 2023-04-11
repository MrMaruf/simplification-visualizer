import BinaryTree from "@/models/BinaryTree";
import StyleProps from "../BaseProps/StyleProps";

export type Item = { name: number } & StyleProps;
export type Items = Item[];
export type Stage = {
  items: Item[];
  name: string;
  description: string;
  followUp: string;
  binaryTree?: BinaryTree;
};
