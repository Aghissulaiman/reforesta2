import AcaraHijau2 from "../componen/Acarapage/AcaraHijau2";
import DaftarAcara from "../componen/Acarapage/DaftarAcara";
import DetailAcara from "../componen/Acarapage/DetailAcara";
import NavbarAll from "../componen/HomePage/NavbarAll";
import Footer from "../componen/landingpage/Footer";

export default function acara(){
    return(
        <div>
            <NavbarAll/>
            <AcaraHijau2/>
            <DetailAcara/>
            <DaftarAcara/>
            <Footer/>
        </div>
    )
}