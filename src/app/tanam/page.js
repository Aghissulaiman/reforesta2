import DetailPembayaran from "../componen/HomePage/DetailPembayaran";
import NavbarAll from "../componen/HomePage/NavbarAll";
import PilihLokasi from "../componen/HomePage/PilihLokasi";
import PohonList from "../componen/HomePage/PohonList";
import TanamPohon from "../componen/HomePage/TanamPohon";
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