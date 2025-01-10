import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  id: number;
}

export default function AddToCartButton({ id }: Props) {
  return (
    <Button size={"icon"}>
      <Plus />
    </Button>
  );
}
