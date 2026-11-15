import { ChevronLeft, X } from "lucide-preact";
import IconButton from "../ui/IconButton";

export default function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <IconButton
      size="sm"
      label="Return to world"
      icon={
        <>
          <X size={14} strokeWidth={1.5} class="mobile:hidden" />
          <ChevronLeft size={14} strokeWidth={1.5} class="hidden mobile:block" />
        </>
      }
      onClick={onClose}
    />
  );
}
