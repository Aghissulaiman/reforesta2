import DukungOleh from "../componen/HomePage/DukungOleh";
import LanggananSection from "../componen/HomePage/LanggananSection";
import NavbarAll from "../componen/HomePage/NavbarAll";
import SekarangSection from "../componen/HomePage/SekarangSection";
import AcaraHijau from "../componen/landingpage/AcaraHijau";
import Footer from "../componen/landingpage/Footer";
import Komunitas from "../componen/landingpage/Komunitas";

export default function home(){
    return(

        <div>
            <NavbarAll/>
            <SekarangSection/>
            <DukungOleh/>
            <Komunitas/>
            <LanggananSection/>
            <AcaraHijau/>
            <Footer/>
        </div>

    )
}