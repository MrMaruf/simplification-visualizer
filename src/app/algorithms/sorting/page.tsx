import React from "react";

import Page from "@/types/Page";
import List from "@/components/List";

type Props = {};
//TODO: Finish up the page

const basePath = "/algorithms/sorting";

const pages: Page[] = [
  { name: "Insertion Algorithm", url: `${basePath}/insertion` },
  { name: "Selection Algorithm", url: `${basePath}/selection` },
  { name: "Heap Sort Algorithm", url: `${basePath}/heap` },
];
const SortingAlgorithmsHome = (props: Props) => {
  return <List items={pages} />;
};

export default SortingAlgorithmsHome;
