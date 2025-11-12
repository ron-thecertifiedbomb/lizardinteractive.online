type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="container bg-dark-bg text-white pt-2 max-w-3xl m-auto px-4">{children}</div>;
}
