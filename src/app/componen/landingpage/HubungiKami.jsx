// components/HubungiKami.jsx
import React from "react";

export default function HubungiKami() {
  return (
    <section className="relative py-16 bg-green-600">
      <div className="container mx-auto px-6">
        {/* Judul */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-10">
          Hubungi Kami
        </h2>

        <div className="flex flex-col md:flex-row items-start justify-center gap-10">
          {/* Map + Info */}
          <div className="w-full md:w-[65%] bg-white/10 rounded-2xl overflow-hidden relative shadow-xl">
            <iframe
              src="https://maps.google.com/maps?width=100%&height=600&hl=id&q=Depok%20Indonesia&ie=UTF8&t=&z=14&iwloc=B&output=embed"
              className="w-full h-[500px]" // tinggi map sedikit diperbesar
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>

            {/* Box Info */}
            <div className="absolute bottom-6 left-6 bg-white p-6 rounded-xl shadow-md w-[90%] md:w-[75%]">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-900">Alamat</h3>
                  <p className="text-gray-600 text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a
                    href="mailto:reforestacia@gmail.com"
                    className="text-green-600 text-xs"
                  >
                    Reforestacia@gmail.com
                  </a>
                  <h3 className="font-semibold text-gray-900 mt-2">No.Telp</h3>
                  <p className="text-gray-600 text-xs">+62 123-4567-8910</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="w-full md:w-[30%]">
            <h1 className="mb-6 text-white text-2xl  font-bold" >Umpan Balik</h1>
            <p className="mb-6 text-white text-sm ">
              Umpan Balik Kalian ibaratkan pohon yang disiram dan terus berkembang
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nama"
                className="w-full bg-white rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-white rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <textarea
                placeholder="Pesan"
                className="w-full bg-white h-40 rounded-lg border border-gray-300 py-3 px-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
              <button
                type="submit"
                className="bg-white text-green-700 font-semibold py-2 rounded-full hover:bg-green-100 transition"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
