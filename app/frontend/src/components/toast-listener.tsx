import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

const ToastListener = ({ children }: any) => {
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.notice) {
      toast.success(flash.notice);
    }

    if (flash.alert) {
      toast.error(flash.alert);
    }
  }, [flash]);

  return <>{children}</>;
};

export default ToastListener;
