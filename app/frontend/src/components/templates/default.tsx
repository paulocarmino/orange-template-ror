import AuthTemplate from "@/frontend/src/components/templates/auth";
import ProtectedTemplate from "@/frontend/src/components/templates/protected";
import { usePage } from "@inertiajs/react";

export default function TemplateDefault({ children }: any) {
  const { auth } = usePage().props;

  if (!auth) return <AuthTemplate>{children}</AuthTemplate>;

  return <ProtectedTemplate>{children}</ProtectedTemplate>;
}
