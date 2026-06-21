import "./App.css";
import { useBoards } from "@entities";
const App = () => {
  const { data: boards, isLoading, isError } = useBoards();

  if (isLoading) return <p>Загрузка</p>;
  if (isError) return <p>Ошибка</p>;
  return (
    <ul>
      {boards?.map((b) => (
        <li key={b.id}>{b.name}</li>
      ))}
    </ul>
  );
};

export default App;
