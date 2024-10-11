import EmpListing from "@/components/EmpListing";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" mt-4 font-[family-name:var(--font-geist-sans)]">
      <EmpListing />
    </div>
  );
}

// grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20
