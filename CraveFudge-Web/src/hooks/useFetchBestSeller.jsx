import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios';

const useFetchBestSeller = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBestSeller = async () => {
        try {
            const response = await axiosInstance.get("/best_seller");
            // console.log("API response:", response.data);

            if (Array.isArray(response.data?.payload?.datas)) {
                setBestSellers(response.data.payload.datas);
            } else {
                console.error("API tidak balikin array best seller: ", response.data);
            }
        } catch (error) {
            console.error("Gagal fetch best seller: ", error);
            alert("Gagal mendapatkan data best seller");
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    };

    fetchBestSeller();
  }, [])

  return { bestSellers, isLoading }
}

export default useFetchBestSeller
