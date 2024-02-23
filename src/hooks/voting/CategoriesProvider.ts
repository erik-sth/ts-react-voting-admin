import { useEffect, useState } from "react";
import { Project } from "../useProjects";

export interface Contestant {
  _id: string;
  name: string;
  categories: string[];
}

const CategoriesProvider = () => {
  const [categories, setCategories] = useState<Project["categories"]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // startup default values
  useEffect(() => {
    setSelectedCategories(categories?.map((c) => c.option1.key) || []);
  }, [categories]);

  return {
    categories,
    selectedCategories,
    setSelectedCategories,
    setCategories,
  };
};

export default CategoriesProvider;
