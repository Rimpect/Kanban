import { BoardView } from "@widgets/board-view";
import { Toaster } from "sonner";
import "@app/styles/toast.css";

const App = () => {
  return (
    <>
      <Toaster />
      <BoardView />;
    </>
  );
};

export default App;
