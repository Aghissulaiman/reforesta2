import AcaraHijau2 from "../componen/Acarapage/AcaraHijau2";
import DaftarAcara from "../componen/Acarapage/DaftarAcara";
import DetailAcara from "../componen/Acarapage/DetailAcara";
import NavbarAll from "../componen/HomePage/NavbarAll";

export default function acara(){
    return(
        <div>
            <NavbarAll/>
            <AcaraHijau2/>
            <DetailAcara/>
            <DaftarAcara/>
        </div>
    )
}