import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import Example from "./components/Example";
import ContentLoader, { Facebook } from "react-content-loader";

const MyLoader = () => <ContentLoader />;
const MyLoaderFacebook = () => <Facebook />;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Suspense fallback={<MyLoader />}>
          <MyLoader />
        </Suspense>
        <Example />
        <MyLoader />
        <MyLoaderFacebook />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
