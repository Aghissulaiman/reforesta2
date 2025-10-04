// components/CaraKerja.jsx
import Image from "next/image";

export default function CaraKerja() {
  const steps = [
    {
      title: "Pilih Tanaman",
      img: "/steps/pilih.png",
      position: "top-0 left-1/2 -translate-x-1/2",
    },
    {
      title: "Disalurkan",
      img: "/steps/salur.png",
      position: "top-1/2 right-0 -translate-y-1/2",
    },
    {
      title: "Ditanam",
      img: "/steps/tanam.png",
      position: "bottom-0 left-1/2 -translate-x-1/2",
    },
    {
      title: "Dokumentasi",
      img: "/steps/dok.png",
      position: "top-1/2 left-0 -translate-y-1/2",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center relative">
        {/* Judul */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
          Gimana sih cara web kita bekerja ?
        </h2>

        {/* Lingkaran Panah */}
        <div className="relative mx-auto w-[350px] h-[350px] md:w-[500px] md:h-[500px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="6"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L6,3 Z" fill="#049B0A" />
              </marker>
            </defs>

            {/* Atas */}
            <path
              d="M 105 5 A 95 95 0 0 1 195 95"
              fill="none"
              stroke="#049B0A"
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
            />
            {/* Kanan */}
            <path
              d="M 195 105 A 95 95 0 0 1 105 195"
              fill="none"
              stroke="#049B0A"
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
            />
            {/* Bawah */}
            <path
              d="M 95 195 A 95 95 0 0 1 5 105"
              fill="none"
              stroke="#049B0A"
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
            />
            {/* Kiri */}
            <path
              d="M 5 95 A 95 95 0 0 1 95 5"
              fill="none"
              stroke="#049B0A"
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
            />
          </svg>

          {/* Step Item */}
          {steps.map((step, index) => (
            <div
              key={index}
              className={`absolute ${step.position} flex flex-col items-center`}
            >
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center overflow-hidden shadow-md">
                <Image
                  src={step.img}
                  alt={step.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-800">
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
