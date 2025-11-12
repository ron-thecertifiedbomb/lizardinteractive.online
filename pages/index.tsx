import Container from "../components/container";
import Image from "next/image";

function HomePage() {
  return (
    <>
      <Container>
        <div className="space-y-8">
          <h1 className="text-lg lg:text-3xl font-bold">
            Yo Wazzup! I’m Ronan a Software Developer, Creator & Problem Solver.
          </h1>

          <p className="text-lg font-light">
            Welcome to <strong>Lizard Interactive Online</strong>, my playground
            for sharing dev tips, tutorials, and projects. I enjoy working with
            <strong> Next.js</strong> and crafting smooth, beautiful web
            experiences.
          </p>

          <p className="text-lg font-light">
            Here you’ll find blogs, code snippets, latest tech news, and
            behind-the-scenes of my creative coding journey. Dive in, get
            inspired, or just explore the lizard’s den.
          </p>

          <p className="text-lg font-light">
            Wanna build your own dev playground? Stick around — I’ll show you
            how!
          </p>
        </div>
      </Container>
      <div className="container max-w-3xl m-auto px-4 mt-6">
        <Image
          src="/js.jpg"
          alt="Javascript"
          width={1920 / 2}
          height={1080 / 2}
          className="rounded-lg shadow-lg"
        />
      </div>
    </>
  );
}

export default HomePage;
