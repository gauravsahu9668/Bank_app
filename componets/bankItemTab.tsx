
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery } from "@/lib/utitls";
import { cn } from "@/lib/utils";
export const BankTabItem = ({ account, appwriteItemId }: BankTabItemProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isActive = appwriteItemId === account?.appwriteItemId;
  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      onClick={handleBankChange}
      className={`gap-[18px]  flex px-2 sm:px-4 py-2 transition-all`}
    >
      <p
        className={`text-16 line-clamp-1 flex-1 font-medium text-gray-500`}
      >
        {account.name}
      </p>
    </div>
  );
};
