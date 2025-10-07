import DetailPembayaran from "../componen/Tanampage/DetailPembayaran";
import NavbarAll from "../componen/HomePage/NavbarAll";
import PilihLokasi from "../componen/Tanampage/PilihLokasi";
import PohonList from "../componen/Tanampage/PohonList";
import TanamPohon from "../componen/Tanampage/TanamPohon";
import Footer from "../componen/landingpage/Footer";

export default function tanam() {
    return(
        <div>
        <NavbarAll/>
        <TanamPohon/>
        <DetailPembayaran/>
        <PilihLokasi/>
        <PohonList/>
        <Footer/>   
        </div>
    )
}