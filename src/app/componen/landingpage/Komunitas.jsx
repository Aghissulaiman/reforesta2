// components/Komunitas.jsx
import Image from "next/image";

export default function Komunitas() {
  const komunitas = [
    {
      nama: "Bumi terra",
      pengikut: "2.000 Pengikut",
      logo: "/LKbumitera.png", // ganti path sesuai file kamu
    },
    {
      nama: "Greenwelfare",
      pengikut: "2.000 Pengikut",
      logo: "/LKGreenwelfare.png",
    },
    {
      nama: "Lindungihutan",
      pengikut: "9.000 Pengikut",
      logo: "/LKlindungihutan .png",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        {/* Judul */}
        <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-12">
          Kami Bekerja Sama Dengan Komunitas Terkenal
        </h2>

        {/* Grid Kartu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {komunitas.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Logo Lingkaran */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-500 shadow-md flex items-center justify-center bg-white -mb-12 relative z-10">
                <Image
                  src={item.logo}
                  alt={item.nama}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              {/* Card */}
              <div className="bg-green-500 text-white rounded-xl pt-16 pb-6 px-6 w-full shadow-md">
                <h3 className="font-bold text-lg">{item.nama}</h3>
                <p className="text-sm">{item.pengikut}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
