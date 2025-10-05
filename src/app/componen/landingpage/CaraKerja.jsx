// components/CaraKerja.jsx
import Image from "next/image";

export default function CaraKerja() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-12">
          Gimana sih cara web kita bekerja ?
        </h2>

        <div className="relative w-full max-w-3xl mx-auto aspect-square">
          {/* Tengah */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-lg md:text-2xl font-extrabold text-gray-900 leading-tight">
              Gimana sih <br /> cara web kita <br /> bekerja ?
            </p>
          </div>

          {/* Pilih Tanaman */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="rounded-full bg-[#4CAF50] w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-lg">
              <Image src="/LPilih.png" alt="Pilih Tanaman" width={40} height={56} />
            </div>
            <p className="mt-3 text-sm md:text-base font-medium text-gray-800">
              Pilih Tanaman
            </p>
          </div>

          {/* Disalurkan */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="rounded-full bg-[#4CAF50] w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-lg">
              <Image src="/Disalurkan.png" alt="Disalurkan" width={40} height={56} />
            </div>
            <p className="mt-3 text-sm md:text-base font-medium text-gray-800">
              Disalurkan
            </p>
          </div>

          {/* Ditanam */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="rounded-full bg-[#4CAF50] w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-lg">
              <Image src="/Ditanam.png" alt="Ditanam" width={40} height={56} />
            </div>
            <p className="mt-3 text-sm md:text-base font-medium text-gray-800">
              Ditanam
            </p>
          </div>

          {/* Dokumentasi */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="rounded-full bg-[#4CAF50] w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-lg">
              <Image src="/Dokumentasi.png" alt="Dokumentasi" width={40} height={56} />
            </div>
            <p className="mt-3 text-sm md:text-base font-medium text-gray-800">
              Dokumentasi
            </p>
          </div>
          <Image
            src="/curved-arrow 4.png"
            alt="arrow"
            width={100}
            height={100}
            className="absolute top-8 right-[15%] w-50 md:w-28 rotate-90"
          />
          <Image
            src="/curved-arrow 4.png"
            alt="arrow"
            width={100}
            height={100}
            className="absolute bottom-[20%] right-15 w-20 md:w-28 rotate-180  "
          />
          <Image
            src="/curved-arrow 4.png"
            alt="arrow"
            width={100}
            height={100}
            className="absolute bottom-20 left-[30%] w-20 md:w-28 rotate-240"
          />
          <Image
            src="/curved-arrow 4.png"
            alt="arrow"
            width={100}
            height={100}
            className="absolute top-[30%] left-20 w-20 md:w-28 rotate-[320deg]"
          />
        </div>
      </div>
    </section>
  );
}
