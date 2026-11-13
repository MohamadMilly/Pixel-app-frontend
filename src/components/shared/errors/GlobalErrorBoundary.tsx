import { useNavigate, useRouteError } from "react-router";
import { TriangleAlert } from "lucide-react";
import { Heading } from "../../ui/Heading";
import { Text } from "../../ui/Text";
import { Button } from "../../ui/Button";
import { getRouteErrorMessage } from "../../../utils/errors/getRouteErrorMessage";

export function GlobalErrorBoundary() {
  const navigate = useNavigate();
  const error = useRouteError();
  const { content, title } = getRouteErrorMessage(error);
  
  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-background px-4 py-12"
    >
      <section
        role="alert"
        className="w-full h-full max-w-xl rounded-2xl border border-secondary bg-surface-disabled p-6 text-center shadow-sm sm:p-10"
      >
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-secondary/60 text-accent">
          <TriangleAlert aria-hidden="true" size={28} />
        </div>
        <Heading className="mb-3 text-2xl sm:text-3xl">{title}</Heading>
        {content && (
          <Text className="break-words" dir="rtl">
            {content}
          </Text>
        )}
        <Button onClick={() => navigate(-1)} className="mt-6">
          العودة
        </Button>
      </section>
    </main>
  );
}
