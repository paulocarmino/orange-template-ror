import ToastListener from "@/frontend/src/components/toast-listener";
import { Card } from "@/frontend/src/components/ui/card";
import { useTheme } from "@/frontend/src/providers/theme-provider";
import { Toaster } from "sonner";

const AuthTemplate = ({ children }: any) => {
  const theme = useTheme().theme;

  return (
    <div className="flex items-center justify-center w-full h-screen px-4">
      <Card className="max-w-sm mx-auto">
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
