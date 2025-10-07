import Image from "next/image";

export default function CaraKerja() {
  const langkah = [
    {
      nama: "Pilih Tanaman",
      icon: "/LPilih.png",
    },
    {
      nama: "Tunggu Disalurkan",
      icon: "/LSalurkan.png",
    },
    {
      nama: "Ditanam",
      icon: "/LTanam.png",
    },
    {
      nama: "Dokumentasi",
      icon: "/LDokumentasi.png",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        {/* Judul */}
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-16">
          Bagaimana cara Website kami bekerja?
        </h2>

        {/* Wrapper langkah */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          {/* Garis horizontal */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gray-300 translate-y-[-50%]"></div>

          {langkah.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center relative bg-white z-10"
            >
              {/* Icon bulat */}
              <div className="w-24 h-24 rounded-full bg-[#10B981]/50 flex items-center justify-center shadow-md">
                <Image
                  src={item.icon}
                  alt={item.nama}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>

              {/* Teks */}
              <p className="mt-4 text-sm md:text-base font-medium text-gray-800">
                {item.nama}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
