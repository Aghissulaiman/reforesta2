"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import usePohon from "../../../../hooks/pohon";
import useDaerah from "../../../../hooks/daerah";

export default function TanamPohonPage({ user }) {
  const { pohon, loading: loadingPohon, error: errorPohon } = usePohon();
  const { daerah, loading: loadingDaerah, error: errorDaerah } = useDaerah();
  const searchParams = useSearchParams();
  const idAcara = searchParams.get("id_acara");

  const [index, setIndex] = useState(0);
  const [lokasiTerpilih, setLokasiTerpilih] = useState(null);
  const [bibitTerpilih, setBibitTerpilih] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // ✅ Load script Midtrans Snap sekali
  useEffect(() => {
    if (typeof window.snap === "undefined") {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute(
        "data-client-key",
        process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
      );
      script.id = "midtrans-script";
      document.body.appendChild(script);
    }
  }, []);

  // 🔹 Carousel kontrol
  const nextSlide = () => {
    const newIndex = (index + 1) % daerah.length;
    setIndex(newIndex);
    setLokasiTerpilih(daerah[newIndex]);
  };

  const prevSlide = () => {
    const newIndex = (index - 1 + daerah.length) % daerah.length;
    setIndex(newIndex);
    setLokasiTerpilih(daerah[newIndex]);
  };

  const getPosition = (i) => {
    const diff = (i - index + daerah.length) % daerah.length;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -daerah.length + 1) return "right";
    if (diff === daerah.length - 1 || diff === -1) return "left";
    return "hidden";
  };

  // 🔹 Pilih & update bibit
  const toggleBibit = (item) => {
    const exists = bibitTerpilih.find((b) => b.nama === item.nama);
    if (exists) {
      setBibitTerpilih(bibitTerpilih.filter((b) => b.nama !== item.nama));
    } else {
      setBibitTerpilih([...bibitTerpilih, { ...item, jumlah: 1 }]);
    }
  };

  const updateJumlah = (nama, jumlah) => {
    setBibitTerpilih(
      bibitTerpilih.map((b) =>
        b.nama === nama ? { ...b, jumlah: Math.max(1, jumlah) } : b
      )
    );
  };

  const totalHarga = bibitTerpilih.reduce(
    (acc, b) => acc + b.harga * b.jumlah,
    0
  );

  // ✅ Update status transaksi ke backend
  async function updateStatus(result, orderDetails) {
    await fetch("/api/transaksi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        order_id: orderDetails.order_id,
        gross_amount: orderDetails.gross_amount,
        transaction_status: result.transaction_status,
        payment_type: result.payment_type,
        transaction_time: result.transaction_time || new Date().toISOString(),
        id_komunitas: lokasiTerpilih?.id || null,
        id_acara: idAcara || null, // ✅ simpan id acara jika dari halaman acara
        tipe_transaksi: "bibit",
        detail: bibitTerpilih,
      }),
    });
  }

  // 💳 Fungsi pembayaran Midtrans
  const handleBayar = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      if (!lokasiTerpilih)
        return alert("Pilih lokasi penanaman terlebih dahulu.");
      if (!bibitTerpilih.length)
        return alert("Pilih minimal satu bibit pohon.");
      if (!user) return alert("Silakan login terlebih dahulu.");

      const orderDetails = {
        order_id: `ORDER-${Date.now()}`,
        gross_amount: totalHarga,
        items: bibitTerpilih.map((b) => ({
          id: b.id,
          name: b.nama,
          price: b.harga,
          quantity: b.jumlah,
        })),
        metadata: {
          lokasi_tanam: lokasiTerpilih.daerah,
          user_email: user.email,
        },
        customer_details: { email: user.email },
      };

      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

      if (!response.ok || !data.token) {
        console.error("Payment API error:", data);
        alert(`Gagal memproses transaksi. ${data.message || "Server error"}`);
        return;
      }

      if (typeof window.snap === "undefined") {
        alert("Midtrans Snap belum dimuat. Coba refresh halaman.");
        return;
      }

      window.snap.pay(data.token, {
        onSuccess: (result) => {
          updateStatus(result, orderDetails);
          alert(
            idAcara
              ? `✅ Pembayaran untuk acara (ID: ${idAcara}) berhasil!`
              : "✅ Pembayaran berhasil!"
          );
        },
        onPending: (result) => updateStatus(result, orderDetails),
        onError: (result) => {
          console.error("Error Midtrans:", result);
          alert("Terjadi kesalahan saat transaksi.");
          updateStatus(result, orderDetails);
        },
        onClose: () => console.log("Pop-up Midtrans ditutup."),
      });
    } catch (err) {
      console.error("Error saat handleBayar:", err);
      alert("Terjadi kesalahan saat memproses pembayaran.");
    } finally {
      setIsProcessing(false);
    }
  };

  // 🔹 Render halaman utama
  return (
    <section className="w-full px-6 py-10 flex flex-col lg:flex-row gap-10">
      {/* BAGIAN KIRI */}
      <div className="flex-1 space-y-12">
        {/* Carousel Lokasi */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pilih Lokasi Penanaman
          </h2>
          {loadingDaerah ? (
            <p className="text-gray-500">Memuat data lokasi...</p>
          ) : errorDaerah ? (
            <p className="text-red-500">Error: {errorDaerah}</p>
          ) : (
            <div className="flex items-center justify-center relative">
              <button
                onClick={prevSlide}
                className="absolute left-0 z-20 bg-green-600 text-white p-3 rounded-full shadow-md hover:bg-green-700 transition"
              >
                <FaChevronLeft />
              </button>

              <div className="relative w-full max-w-[700px] h-[260px] flex items-center justify-center overflow-hidden">
                {daerah.map((item, i) => {
                  const pos = getPosition(i);
                  let x = 0,
                    scale = 1,
                    zIndex = 1,
                    opacity = 1;
                  if (pos === "left") {
                    x = -240;
                    scale = 0.85;
                    opacity = 0.5;
                  } else if (pos === "right") {
                    x = 240;
                    scale = 0.85;
                    opacity = 0.5;
                  } else if (pos === "center") {
                    zIndex = 10;
                    opacity = 1;
                  } else {
                    opacity = 0;
                    scale = 0.5;
                  }

                  return (
                    <motion.div
                      key={item.id || i}
                      animate={{ x, scale, opacity }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute"
                      style={{ zIndex }}
                    >
                      <div className="relative w-[260px] h-[240px] rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={item.gambar}
                          alt={item.daerah}
                          fill
                          className="object-cover"
                        />
                        <div
                          className={`absolute inset-0 ${
                            pos === "center" ? "bg-black/20" : "bg-black/60"
                          }`}
                        />
                        <h3 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
                          {pos === "center" ? item.daerah : ""}
                        </h3>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <button
                onClick={nextSlide}
                className="absolute right-0 z-20 bg-green-600 text-white p-3 rounded-full shadow-md hover:bg-green-700 transition"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Pilih Bibit */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pilih Bibit Pohon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loadingPohon ? (
              <p className="text-gray-500">Memuat data pohon...</p>
            ) : errorPohon ? (
              <p className="text-red-500">Error: {errorPohon}</p>
            ) : (
              pohon.map((item, i) => {
                const selected = bibitTerpilih.some(
                  (b) => b.nama === item.nama
                );
                return (
                  <div
                    key={i}
                    className={`bg-white rounded-xl shadow-lg border-2 overflow-hidden ${
                      selected ? "border-green-500" : "border-gray-200"
                    }`}
                  >
                    <div className="relative w-full h-[200px]">
                      <Image
                        src={item.gambar || "/placeholder.png"}
                        alt={item.nama}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 text-center bg-green-700 text-white">
                      <h3 className="font-semibold">{item.nama}</h3>
                      <p className="text-sm mt-1">
                        Rp {item.harga.toLocaleString("id-ID")} / bibit
                      </p>
                      <button
                        onClick={() => toggleBibit(item)}
                        className="mt-3 px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-green-700 hover:bg-gray-100"
                      >
                        {selected ? "Batal Pilih" : "Pilih Bibit"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* BAGIAN KANAN */}
      <div className="w-full lg:w-[360px]">
        <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Detail Penanaman
          </h3>
          <div className="flex justify-between items-center text-gray-700">
            <span className="font-medium">Lokasi</span>
            <span className="text-green-600 font-semibold">
              {lokasiTerpilih?.daerah || "-"}
            </span>
          </div>

          <div className="mt-4">
            <h4 className="text-gray-800 font-medium mb-2">Bibit Terpilih</h4>
            {bibitTerpilih.length === 0 ? (
              <p className="text-gray-400 text-sm">Belum ada bibit dipilih</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {bibitTerpilih.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-xl shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={b.gambar || "/placeholder.png"}
                          alt={b.nama}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">
                          {b.nama}
                        </span>
                        <p className="text-gray-500 text-sm">
                          Rp {b.harga.toLocaleString("id-ID")} / bibit
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min={1}
                        value={b.jumlah}
                        onChange={(e) =>
                          updateJumlah(b.nama, parseInt(e.target.value))
                        }
                        className="w-14 text-center text-sm border rounded-lg p-1"
                      />
                      <button
                        onClick={() =>
                          setBibitTerpilih(
                            bibitTerpilih.filter((item) => item.nama !== b.nama)
                          )
                        }
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200">
            <span className="text-gray-800 font-semibold text-lg">Total</span>
            <span className="text-green-600 font-bold text-lg">
              Rp {totalHarga.toLocaleString("id-ID")}
            </span>
          </div>

          <button
            onClick={handleBayar}
            disabled={!lokasiTerpilih || bibitTerpilih.length === 0}
            className={`w-full py-3 rounded-xl font-semibold text-lg text-white ${
              !lokasiTerpilih || bibitTerpilih.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Bayar
          </button>
        </div>
      </div>
    </section>
  );
}
