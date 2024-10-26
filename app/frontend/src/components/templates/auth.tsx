import ToastListener from "@/frontend/src/components/toast-listener";
import { Card } from "@/frontend/src/components/ui/card";
import { useTheme } from "@/frontend/src/providers/theme-provider";
import { Head } from "@inertiajs/react";
import { Toaster } from "sonner";

const AuthTemplate = ({ children }: any) => {
  const theme = useTheme().theme;

  return (
    <div className="flex justify-center items-center px-4 w-full h-screen">
      <Card className="mx-auto max-w-sm">
        <ToastListener>
          <Toaster
            position="top-center"
            richColors={true}
            theme={theme}
            closeButton
          />
        </ToastListener>

        {children}
      </Card>
    </div>
  );
};

export default AuthTemplate;
