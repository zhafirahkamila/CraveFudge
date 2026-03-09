import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

const useFetchProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get("/products_type");
        console.log("API response: ", response.data);

        if (Array.isArray(response.data?.payload?.datas)) {
          setProducts(response.data.payload.datas);
        } else {
          console.error("API tidak balikin array products:", response.data);
        }
      } catch (error) {
        console.error("Gagal fetch products:", error);
        alert("Gagal mendapatkan data products");
      } finally {
        // delay 3 detik sebelum loading selesai
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchProduct();
  }, []);

  return { products, isLoading };
};

export default useFetchProduct;
