import Container from "../components/container";
import Image from "next/image";

function HomePage() {
  return (
    <>
      <Container>
        <div className="space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Yo Whazzap, I’m Ronan, a Developer, Creator & Problem Solver 
          </h1>

          <p className="text-lg">
            Welcome to <strong>Lizard Interactive Online</strong>, my playground
            for sharing dev tips, tutorials, and projects. I enjoy working with
            <strong> Next.js</strong> and crafting smooth, beautiful web
            experiences.
          </p>

          <p className="text-lg">
            Here you’ll find blogs, code snippets, latest tech news, and
            behind-the-scenes of my creative coding journey. Dive in, get
            inspired, or just explore the lizard’s den.
          </p>

          <p className="text-lg font-semibold">
            Wanna build your own dev playground? Stick around — I’ll show you
            how!
          </p>
        </div>
      </Container>

      <div className="container max-w-3xl m-auto px-4 mt-8">
        <Image
          src="/desk.jpg"
          alt="My desk setup"
          width={1920 / 2}
          height={1280 / 2}
          className="rounded-xl shadow-lg"
        />
      </div>
    </>
  );
}

export default HomePage;
