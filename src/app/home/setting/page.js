import NavbarAll from "@/app/componen/HomePage/NavbarAll";
import Footer from "@/app/componen/landingpage/Footer";
import AccountSettings from "@/app/componen/settingpage/AccountSettings";

export default function setting (){
    return(
        <div>
            <NavbarAll/>
            <AccountSettings/>
            <Footer/>
        </div>
    )
}