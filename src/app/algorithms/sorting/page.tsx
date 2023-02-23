import React from "react";

import Page from "@/types/Page";
import AlgorithmsList from "@/components/algorithms/AlgorithmsList";

type Props = {};
//TODO: Finish up the page

const basePath = "/algorithms/sorting";

const pages: Page[] = [
  { name: "Insertion Algorithm", url: `${basePath}/insertion` },
];
const SortingAlgorithmsHome = (props: Props) => {
  return <AlgorithmsList pages={pages} />;
};

export default SortingAlgorithmsHome;
