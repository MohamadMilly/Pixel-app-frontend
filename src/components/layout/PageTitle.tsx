import { type LucideIcon } from "lucide-react";
import { Heading } from "../ui/Heading";

type PageTitleProps = {
  Icon: LucideIcon;
  title: string;
};

export function PageTitle({ Icon, title }: PageTitleProps) {
  return (
    <div
      className="mb-4 flex items-center gap-3 pb-4 sm:mb-6 sm:pb-5  border-b-4 border-accent w-fit"
      dir="rtl"
    >
      <Icon className="text-accent" size={42} />
      <Heading level={1}>{title}</Heading>
    </div>
  );
}
