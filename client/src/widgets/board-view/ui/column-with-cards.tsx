import { Card, Column, useCards } from "@entities";

type Props = { columnId: string; name: string };

export function ColumnWithCards({ columnId, name }: Props) {
  const { data: cards, isLoading } = useCards(columnId);

  return (
    <Column name={name} dragging={false}>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        cards?.map((card) => <Card key={card.id} title={card.title} />)
      )}
    </Column>
  );
}
