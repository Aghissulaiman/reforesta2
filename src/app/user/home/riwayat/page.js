"use client";

"use client";

import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ ubah cara impor-nya
import NavbarAll from "@/app/componen/HomePage/NavbarAll";
import NavbarDonatur from "@/app/componen/HomePage/NavbarDonatur";
import Footer from "@/app/componen/landingpage/Footer";


export default function Riwayat() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    const ambilRole = async () => {
      if (!session?.user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) throw error;
        setRole(data?.role || "penanam");
      } catch (err) {
        console.error("Gagal ambil role:", err.message);
        setRole("penanam");
      } finally {
        setLoading(false);
      }
    };

    ambilRole();

    // Dummy data sementara
    const dummyRiwayat = [
      {
        id: 1,
        order_id: "ORDER-001",
        transaction_status: "settlement",
        payment_type: "bank_transfer",
        gross_amount: 150000,
        transaction_time: "2025-10-10 14:35:00",
        va_number: "9876543210",
        bank: "bca",
        user_id: 12,
      },
      {
        id: 2,
        order_id: "ORDER-002",
        transaction_status: "pending",
        payment_type: "qris",
        gross_amount: 80000,
        transaction_time: "2025-10-11 09:20:00",
        va_number: "-",
        bank: "-",
        user_id: 12,
      },
      {
        id: 3,
        order_id: "ORDER-003",
        transaction_status: "expire",
        payment_type: "bank_transfer",
        gross_amount: 60000,
        transaction_time: "2025-10-12 08:15:00",
        va_number: "1234567890",
        bank: "bni",
        user_id: 12,
      },
    ];
    setRiwayat(dummyRiwayat);
  }, [session, supabase]);

  const handleDownloadPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Riwayat Pembayaran", 14, 20);

  const tableColumn = [
    "Order ID",
    "Status",
    "Tipe Pembayaran",
    "Jumlah (Rp)",
    "Waktu Transaksi",
    "VA Number",
    "Bank",
  ];

  const tableRows = riwayat.map((item) => [
    item.order_id,
    item.transaction_status,
    item.payment_type,
    `Rp ${item.gross_amount.toLocaleString("id-ID")}`,
    item.transaction_time,
    item.va_number,
    item.bank,
  ]);

  // ✅ panggil seperti ini:
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [46, 204, 113] },
  });

  doc.save("riwayat-pembayaran.pdf");
};


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 mt-4 animate-pulse">
          Memuat data pengguna...
        </p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
        <p className="text-gray-700 mb-3">
          Akses ditolak. Silakan login untuk melihat riwayat pembayaran Anda. 🔒
        </p>
        <a
          href="/user/login"
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Masuk Sekarang
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hwhite">
      {/* Navbar sesuai role */}
      {role === "donatur" || role === "sekolah" ? (
        <NavbarDonatur user={session.user} />
      ) : (
        <NavbarAll user={session.user} />
      )}

      <main className="container mt-25 mx-auto px-4 py-12">
  <div className="max-w-4xl mx-auto"> {/* ✅ Tambahkan pembungkus ini */}

    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-green-700 tracking-tight">
        Riwayat Pembayaran
      </h1>
      <button
        onClick={handleDownloadPDF}
        className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
      >
        Download PDF
      </button>
    </div>

    <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-green-600 text-white text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Order ID</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Tipe Pembayaran</th>
            <th className="px-4 py-3 font-semibold">Jumlah</th>
            <th className="px-4 py-3 font-semibold">Waktu</th>
            <th className="px-4 py-3 font-semibold">VA Number</th>
            <th className="px-4 py-3 font-semibold">Bank</th>
          </tr>
        </thead>
        <tbody>
          {riwayat.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-100 hover:bg-green-50 transition"
            >
              <td className="px-4 py-3 font-medium text-gray-800">
                {item.order_id}
              </td>
              <td
                className={`px-4 py-3 font-semibold ${
                  item.transaction_status === "settlement"
                    ? "text-green-600"
                    : item.transaction_status === "pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {item.transaction_status}
              </td>
              <td className="px-4 py-3 text-gray-700">
                {item.payment_type}
              </td>
              <td className="px-4 py-3 text-gray-700">
                Rp {item.gross_amount.toLocaleString("id-ID")}
              </td>
              <td className="px-4 py-3 text-gray-700">
                {item.transaction_time}
              </td>
              <td className="px-4 py-3 text-gray-700">{item.va_number}</td>
              <td className="px-4 py-3 text-gray-700">{item.bank}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {riwayat.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Belum ada riwayat pembayaran.
        </div>
      )}
    </div>
  </div> {/* ✅ Tutup pembungkus */}
</main>


      <Footer />
    </div>
  );
}
