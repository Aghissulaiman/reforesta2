"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import usePohon from "../../../../hooks/pohon";
import useDaerah from "../../../../hooks/daerah";
import Swal from "sweetalert2"; // ✅ Tambahkan SweetAlert2

export default function TanamPohonPageS({ user }) {
  const { pohon, loading: loadingPohon, error: errorPohon } = usePohon();
  const { daerah, loading: loadingDaerah, error: errorDaerah } = useDaerah();

  const [index, setIndex] = useState(0);
  const [lokasiTerpilih, setLokasiTerpilih] = useState(null);
  const [bibitTerpilih, setBibitTerpilih] = useState([]);
  const [jumlahMurid, setJumlahMurid] = useState(0); // 🔹 jumlah murid terkena denda
  const [isProcessing, setIsProcessing] = useState(false);

  // ✅ Load Midtrans Snap
  useEffect(() => {
    if (typeof window.snap === "undefined") {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute(
        "data-client-key",
        process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
      );
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

  // 🔹 Hitung total harga (bibit + denda)
  const totalBibit = bibitTerpilih.reduce(
    (acc, b) => acc + b.harga * b.jumlah,
    0
  );
  const totalDenda = jumlahMurid * 1000;
  const totalHarga = totalBibit;

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
      }),
    });
  }

  // 💳 Fungsi pembayaran Midtrans
  const handleBayar = async () => {
    if (!lokasiTerpilih || bibitTerpilih.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Pilih Lokasi & Bibit",
        text: "Silakan pilih lokasi penanaman dan bibit pohon terlebih dahulu.",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (totalDenda < totalBibit) {
      Swal.fire({
        icon: "error",
        title: "Dana Tidak Cukup",
        html: `
          Total bibit: <b>Rp ${totalBibit.toLocaleString("id-ID")}</b><br>
          Dana tersedia: <b>Rp ${totalDenda.toLocaleString("id-ID")}</b>
        `,
        confirmButtonColor: "#d33",
      });
      return;
    }

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
        items: [
          ...bibitTerpilih.map((b) => ({
            id: b.id,
            name: b.nama,
            price: b.harga,
            quantity: b.jumlah,
          })),
          {
            id: "DENDA_MURID",
            name: `Denda ${jumlahMurid} murid`,
            price: 1000,
            quantity: jumlahMurid,
          },
        ],
        metadata: {
          lokasi_tanam: lokasiTerpilih.daerah,
          user_email: user.email,
          jumlah_murid: jumlahMurid,
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
        Swal.fire({
          icon: "error",
          title: "Gagal Memproses Transaksi",
          text: data.message || "Terjadi kesalahan pada server.",
          confirmButtonColor: "#d33",
        });
        return;
      }

      if (typeof window.snap === "undefined") {
        Swal.fire({
          icon: "error",
          title: "Midtrans Belum Siap",
          text: "Coba muat ulang halaman dan ulangi transaksi.",
          confirmButtonColor: "#d33",
        });
        return;
      }

      window.snap.pay(data.token, {
        onSuccess: (result) => {
          Swal.fire({
            icon: "success",
            title: "Pembayaran Berhasil!",
            text: "Terima kasih telah berkontribusi menanam pohon 🌱",
            confirmButtonColor: "#059669",
          });
          console.log("Sukses:", result);
        },
        onPending: (result) => {
          Swal.fire({
            icon: "info",
            title: "Menunggu Pembayaran",
            text: "Transaksi kamu sedang diproses.",
            confirmButtonColor: "#059669",
          });
          console.log("Pending:", result);
        },
        onError: (result) => {
          console.error("Error Midtrans:", result);
          Swal.fire({
            icon: "error",
            title: "Transaksi Gagal",
            text: "Terjadi kesalahan saat memproses pembayaran.",
            confirmButtonColor: "#d33",
          });
        },
        onClose: () => {
          Swal.fire({
            icon: "warning",
            title: "Dibatalkan",
            text: "Kamu menutup jendela pembayaran.",
            confirmButtonColor: "#059669",
          });
        },
      });
    } catch (err) {
      console.error("Error saat handleBayar:", err);
      Swal.fire({
        icon: "error",
        title: "Kesalahan Sistem",
        text: "Terjadi kesalahan saat memproses pembayaran.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  // === 🧱 Render ===
  return (
    <section className="w-full -mt-30 px-40 py-10 flex flex-col lg:flex-row gap-10">
      {/* BAGIAN KIRI */}
      <div className="flex-1 space-y-12">
        {/* Carousel Lokasi */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pilih Lokasi Penanaman</h2>
          {loadingDaerah ? (
            <p className="text-gray-500">Memuat data lokasi..</p>
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
                  let x = 0, scale = 1, zIndex = 1, opacity = 1;
                  if (pos === "left") { x = -240; scale = 0.85; opacity = 0.5; }
                  else if (pos === "right") { x = 240; scale = 0.85; opacity = 0.5; }
                  else if (pos === "center") { zIndex = 10; opacity = 1; }
                  else { opacity = 0; scale = 0.5; }

                  return (
                    <motion.div
                      key={item.id || i}
                      animate={{ x, scale, opacity }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute"
                      style={{ zIndex }}
                    >
                      <div className="relative w-[260px] h-[240px] rounded-xl overflow-hidden shadow-lg">
                        <Image src={item.gambar} alt={item.daerah} fill className="object-cover" />
                        <div className={`absolute inset-0 ${pos === "center" ? "bg-black/20" : "bg-black/60"}`} />
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pilih Bibit Pohon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loadingPohon ? (
              <p className="text-gray-500">Memuat data pohon...</p>
            ) : errorPohon ? (
              <p className="text-red-500">Error: {errorPohon}</p>
            ) : (
              pohon.map((item, i) => {
                const selected = bibitTerpilih.some((b) => b.nama === item.nama);
                return (
                  <div
                    key={i}
                    className={`bg-white rounded-xl shadow-lg border-2 overflow-hidden ${
                      selected ? "border-green-500" : "border-gray-200"
                    }`}
                  >
                    <div className="relative w-full h-[200px]">
                      <Image src={item.gambar || "/placeholder.png"} alt={item.nama} fill className="object-cover" />
                    </div>
                    <div className="p-4 text-center bg-green-700 text-white">
                      <h3 className="font-semibold">{item.nama}</h3>
                      <p className="text-sm mt-1">Rp {item.harga.toLocaleString("id-ID")} / bibit</p>
                      <button
                        onClick={() => toggleBibit(item)}
                        className={`mt-3 px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-green-700 hover:bg-gray-100`}
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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Detail Penanaman</h3>

          {/* Lokasi */}
          <div className="flex justify-between items-center text-gray-700">
            <span className="font-medium">Lokasi</span>
            <span className="text-green-600 font-semibold">{lokasiTerpilih?.daerah || "-"}</span>
          </div>

          {/* Input Jumlah Murid */}
          <div className="mt-4">
            <label className="block text-gray-800 font-medium mb-1">
              Jumlah Murid Terkena Denda
            </label>
            <input
              type="number"
              min={0}
              value={jumlahMurid}
              onChange={(e) => setJumlahMurid(parseInt(e.target.value) || 0)}
              className="w-full border rounded-lg p-2 text-gray-700"
              placeholder="Masukkan jumlah murid"
            />
            <p className="text-sm text-gray-500 mt-1">
              Denda Rp 1.000 x {jumlahMurid || 0} murid ={" "}
              <span className="text-green-600 font-semibold">
                Rp {(jumlahMurid * 1000).toLocaleString("id-ID")}
              </span>
            </p>
          </div>

          {/* Bibit Terpilih */}
          <div className="mt-4">
            <h4 className="text-gray-800 font-medium mb-2">Bibit Terpilih</h4>
            {bibitTerpilih.length === 0 ? (
              <p className="text-gray-400 text-sm">Belum ada bibit dipilih</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {bibitTerpilih.map((b, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-200">
                        <Image src={b.gambar || "/placeholder.png"} alt={b.nama} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">{b.nama}</span>
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
                        onChange={(e) => updateJumlah(b.nama, parseInt(e.target.value))}
                        className="w-14 text-center text-sm border rounded-lg p-1"
                      />
                      <button
                        onClick={() =>
                          setBibitTerpilih(bibitTerpilih.filter((item) => item.nama !== b.nama))
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

          {/* Total */}
          <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200">
            <span className="text-gray-800 font-semibold text-lg">Total</span>
            <span className="text-green-600 font-bold text-lg">
              Rp {totalHarga.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Tombol Bayar */}
          <button
            onClick={handleBayar}
            disabled={!lokasiTerpilih || (bibitTerpilih.length === 0 && jumlahMurid === 0)}
            className={`w-full py-3 rounded-xl font-semibold text-lg text-white ${
              !lokasiTerpilih || (bibitTerpilih.length === 0 && jumlahMurid === 0)
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
