type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div
      className="
        container m-auto max-w-3xl
        bg-dark-bg text-white
        
        px-4 sm:px-6     /* wider padding on small screens */
        pt-2 sm:pt-4 md:pt-2   /* much better spacing on mobile */
      "
    >
      {children}
    </div>
  );
}
