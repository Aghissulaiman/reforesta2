"use client";


import DetailPembayaran from "../componen/Tanampage/DetailPembayaran";
import NavbarAll from "../componen/HomePage/NavbarAll";
import PilihLokasi from "../componen/Tanampage/PilihLokasi";
import PohonList from "../componen/Tanampage/PohonList";
import TanamPohon from "../componen/Tanampage/TanamPohon";
import Footer from "../componen/landingpage/Footer";
import useAuthRedirect from "../../../hooks/useAuthRedirect";
import TanamPohonPage from "../componen/Tanampage/TanamPohonPage";


export default function tanam() {
    useAuthRedirect(); 
    return(
        <div>
        <NavbarAll/>
        <TanamPohon/>
        <TanamPohonPage/>
        <Footer/>   
        </div>
    )
}