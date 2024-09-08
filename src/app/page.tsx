import About from "@/components/about";
import { FooterC } from "@/components/footer";
import Header from "@/components/header";
import NavBar from "@/components/navbar";
import Services from "@/components/services";

export default function Home() {
  return (
    <main>
      <NavBar></NavBar>
      <Header></Header>
      <Services></Services>
      <About></About>
      <FooterC></FooterC>
    </main>
  );
}
