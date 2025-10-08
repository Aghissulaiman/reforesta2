import LanggananSection from "../componen/HomePage/LanggananSection";
import NavbarAll from "../componen/HomePage/NavbarAll";
import Footer from "../componen/landingpage/Footer";
import KenapaLangganan from "../componen/langgananpage/KenapaLangganan";
import LanggananSection2 from "../componen/langgananpage/LanggananSection2";

export default function langganan(){
    return(
        <div>
            <NavbarAll/>
            <KenapaLangganan/>
            <LanggananSection2/>
            <Footer/>
        </div>
    )
}