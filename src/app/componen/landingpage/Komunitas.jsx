import Image from "next/image";

export default function Komunitas() {
  const komunitas = [
    {
      nama: "Bumi terra",
      pengikut: "2.000 Pengikut",
      logo: "/LKbumitera.png",
    },
    {
      nama: "Greenwelfare",
      pengikut: "2.000 Pengikut",
      logo: "/LKGreenwelfare.png",
    },
    {
      nama: "Lindungihutan",
      pengikut: "9.000 Pengikut",
      logo: "/LKlindungihutan.png",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        {/* Judul */}
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-12">
          Kami Bekerja Sama Dengan Komunitas Terkenal
        </h2>

        {/* Grid Komunitas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
          {komunitas.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-3 transition-transform duration-300 hover:scale-105"
            >
              {/* Logo */}
              <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm">
                <Image
                  src={item.logo}
                  alt={item.nama}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>

              {/* Nama & Pengikut */}
              <h3 className="text-lg font-semibold text-black">{item.nama}</h3>
              <p className="text-gray-600 text-sm">{item.pengikut}</p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
