import { useEffect, useState } from "react";

export default function usePohon () {
    const [pohon, setPohon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchPohon = async () => {
            try {
                  const res = await fetch("/api/pohon");
        if (!res.ok) throw new Error("Gagal mengambil data pohon");
        const data = await res.json();
        setPohon(data);
            }
            catch(err) {
                setError(err.message);
            } finally {
                setLoading(false)
            }
        }
        fetchPohon();
    }, [])

    return{pohon, loading, error}
}