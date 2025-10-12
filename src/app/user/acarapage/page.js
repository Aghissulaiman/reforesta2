import { AcaraProvider } from "@/app/componen/Acarapage/AcaraContext";
import FormAcara from "@/app/componen/AcaraPenanam/FormAcara";
import DaftarAcara from "@/app/componen/Acarapage/DaftarAcara";
import NavbarAll from "@/app/componen/HomePage/NavbarAll";

export default function AcaraPage() {
  return (
    <AcaraProvider>
      <div className="flex flex-col gap-10">
        <NavbarAll/>
        <FormAcara />
      </div>
    </AcaraProvider>
  );
}
