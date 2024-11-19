import { Provider } from "react-redux";
import store from "store/store";
import { HashRouter } from "react-router-dom";
import { WardrobeContainer } from "containers/WardrobeContainer/WardrobeContainer";

export const App = () => <Provider store={store}><HashRouter basename="/" future={{ v7_startTransition: true }}><WardrobeContainer /></HashRouter></Provider>;