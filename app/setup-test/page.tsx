import React from "react";
import { UserSearch } from "lucide-react";
import { vazir, vazirBold,vazirMedium,vazirThin,vazirLight } from "@/lib/fonts";
export default function page() {
  return (
    <div>
      <UserSearch size={50} color="red" />
      <div>vazir::{JSON.stringify(vazirBold.style)}</div>
      <div className="vazir-bold">سلام دنیا</div>
      <div className="vazir">سلام دنیا</div>
    </div>
  );
}
