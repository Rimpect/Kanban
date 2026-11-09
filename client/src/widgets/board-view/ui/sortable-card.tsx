import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@entities";
import type { Tag } from "@kanban/shared";

type Props = {
  card: { id: string; title: string; tags: Tag[] };
  columnId: string;
  onOpen: () => void;
};

export function SortableCard({ card, onOpen, columnId }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id, data: { columnId } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      title={card.title}
      onOpen={onOpen}
      tags={card.tags}
      {...attributes}
      {...listeners}
    />
  );
}
