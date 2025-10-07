import { useEffect, useState } from "react";

export default function useDaerah () {
    const [daerah, setDaerah] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchDaerah = async () => {
            try {
                  const res = await fetch("/api/daerah");
        if (!res.ok) throw new Error("Gagal mengambil data daerah");
        const data = await res.json();
        setDaerah(data);
            }
            catch(err) {
                setError(err.message);
            } finally {
                setLoading(false)
            }
        }
        fetchDaerah();
    }, [])

    return{daerah, loading, error}
}