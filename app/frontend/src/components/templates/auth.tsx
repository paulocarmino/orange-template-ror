import ToastListener from "@/frontend/src/components/toast-listener";
import { useTheme } from "@/frontend/src/providers/theme-provider";
import { Toaster } from "sonner";

const AuthTemplate = ({ children }: any) => {
  const theme = useTheme().theme;

  return (
    <div>
      <ToastListener>
        <Toaster
          position="top-center"
          richColors={true}
          theme={theme}
          closeButton
        />
      </ToastListener>

      {children}
    </div>
  );
};

export default AuthTemplate;
