type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div
      className="
        container m-auto max-w-3xl
        bg-dark-bg text-white
        
        px-4 sm:px-6
        pt-6 sm:pt-8 md:pt-10
      "
    >
      {children}
    </div>
  );
}
