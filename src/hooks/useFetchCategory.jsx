import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const useFetchCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosInstance.get("/categories");

        if (Array.isArray(response.data?.payload?.datas)) {
          setCategories(response.data.payload.datas);
        } else {
          console.error("API tidak balikin array categories:", response.data);
        }
      } catch (error) {
        console.error("Gagal fetch categories:", error);
        alert("Gagal mendapatkan data menu category");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchCategory();
  }, []);

  return { categories, isLoading };
};

export default useFetchCategory;
