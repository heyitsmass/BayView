import { HomepageContext, HomepageDispatch, HomepageManager } from "@/context";
import { useContext } from "react";

const useHomepage = () => {
  return useContext(HomepageContext);
};

const useHomepageDispatch = () => {
  return useContext(HomepageDispatch);
};

const useHomepageManager = () => {
  return useContext(HomepageManager);
};

export { useHomepage, useHomepageDispatch, useHomepageManager };
