import React from "react";
import ContentLoader, { Facebook } from "react-content-loader";

const MyLoader = () => <ContentLoader />;
const FaceBook = () => <Facebook />;

function Skeleton(props) {
  return (
    <>
      <MyLoader />
      <FaceBook />
      <FaceBook />
      <FaceBook />
    </>
  );
}

export default Skeleton;
