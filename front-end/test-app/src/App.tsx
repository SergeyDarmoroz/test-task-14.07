import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import WidgetProductList from "./widgets/WidgetProductList";
import WidgetReviews from "./widgets/WidgetReviews";
import { reviews } from "./mock-tool"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WidgetProductList />,
    },
    {
      path: "reviews",
      element: <WidgetReviews reviews={reviews} />,
    },
  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
