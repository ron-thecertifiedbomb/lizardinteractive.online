import Link from "next/link";
import Container from "../components/container";

export default function Header() {
  return (
    <header className="py-6 bg-dark-bg text-white">
      <Container>
        <nav className="flex space-x-4 items-center justify-between">
          <div className="flex justify-center items-center">
            <img
              src={"/lizardinteractive.png"}
              alt={"lizardinteractive logo"}
              className="max-w-xs max-h-12 rounded-xl"
            /></div>
       
          <div className="flex gap-4">
            <Link href="/">About</Link>
           
            <Link href="/blogs">Blog</Link>
            <Link href="/latest">Latest</Link>
            <Link href="/utilities">Utilities</Link>
            {/* <Link href="/posts">Posts</Link>*/}
            </div> 
      
        </nav>
      </Container>
    </header>
  );
}
