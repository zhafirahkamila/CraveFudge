import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios';

const useFetchLink = () => {
  const [links, setLinks] = useState({});

  useEffect(() => {
    const fetchLink = async () => {
        try {
            const response = await axiosInstance.get("/links")
            console.log("API response:", response.data);

            if (Array.isArray(response.data?.payload?.datas)) {
                setLinks(response.data.payload.datas[0] || {});
            } else {
                console.error("API tidak balikin array links:", response.data);
            }
        } catch (error) {
            console.error("Gagal fetch links: ", error)
            alert("Gagal mendapatkan data links");
        }
    };

    fetchLink();
  }, []);

  return { links };
}

export default useFetchLink
