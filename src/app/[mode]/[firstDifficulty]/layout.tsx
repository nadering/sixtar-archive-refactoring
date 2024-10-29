// 서열표 레이아웃
export default function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col grow w-full translate-y-[-4px] px-3">
      {children}
    </div>
  );
}
