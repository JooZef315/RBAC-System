export default function UnauthorizedPage({ text }: { text: string }) {
  return (
    <div className="flex justify-center my-4 items-center text-lg text-gray-500">
      {text}
    </div>
  );
}
