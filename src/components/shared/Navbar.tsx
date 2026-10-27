import { BookOpenText, BookUser, ShoppingCartMinus } from "lucide-react";
import { AppNavLink } from "../ui/AppNavLink";
import { Image } from "../ui/Image";
import { Badge } from "../ui/Badge";

function Navbar({ ordersCount }: { ordersCount: number }) {
  return (
    <nav
      aria-label="التنقل الرئيسي"
      className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-3 sm:min-h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-0"
    >
      <div className="flex h-12 overflow-hidden w-12 shrink-0 items-center justify-center rounded-full border border-secondary">
        <Image
          alt="user avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
        />
      </div>
      <ul className="flex flex-wrap items-center gap-x-1 sm:gap-x-2" dir="rtl">
        <li>
          <AppNavLink
            className="flex items-center justify-center gap-2"
            to="/booksPurchases"
          >
            <BookUser size={24} />
            <span>كتبي</span>
          </AppNavLink>
        </li>
        <li>
          <AppNavLink
            className="flex items-center relative justify-center gap-2"
            to="/orders"
          >
            {ordersCount > 0 && (
              <Badge
                variant="danger"
                className="absolute text-xs top-0 right-0 translate-x-1/3 -translate-y-1/3"
              >
                {ordersCount}
              </Badge>
            )}
            <ShoppingCartMinus size={24} />
            <span>طلباتي</span>
          </AppNavLink>
        </li>
        <li>
          <AppNavLink
            className="flex items-center justify-center gap-2"
            to="/bookslist"
          >
            <BookOpenText size={24} />
            <span>قائمة الكتب</span>
          </AppNavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
