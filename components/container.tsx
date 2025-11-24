type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {children}
    </div>
  );
}