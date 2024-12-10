import { Provider } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import store from "store/store";
import { WardrobeContainer } from "containers";
import { WardrobeConstants } from "constant";

export const App = () => <Provider store={store}>
  <HashRouter basename="/" future={{ v7_startTransition: true }}>
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to={`${WardrobeConstants.API_MAIN_ROUTE}/36*84*24`} replace />} />
        <Route path={`${WardrobeConstants.API_MAIN_ROUTE}/:entity`} element={<WardrobeContainer />} />
      </Route>
    </Routes>
  </HashRouter>
</Provider>;