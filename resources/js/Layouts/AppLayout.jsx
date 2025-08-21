import Header from "@/Components/Header";
import Footer from "@/Components/Footer";


export default function AppLayout({children}){
    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
