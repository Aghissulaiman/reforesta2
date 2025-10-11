import { AcaraProvider } from "@/app/componen/Acarapage/AcaraContext";
import FormAcara from "@/app/componen/AcaraPenanam/FormAcara";
import DaftarAcara from "@/app/componen/Acarapage/DaftarAcara";
import NavbarDonatur from "@/app/componen/HomePage/NavbarDonatur";

export default function AcaraPage() {
  return (
    <AcaraProvider>
      <div className="flex flex-col gap-10">
        <NavbarDonatur/>
        <FormAcara />
      </div>
    </AcaraProvider>
  );
}
