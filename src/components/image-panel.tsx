import React, { ReactNode } from "react";
import Img, { FixedObject } from "gatsby-image";

type Props = {
  header: string;
  imageFixed?: FixedObject;
  children: ReactNode;
};

const ImagePanel: React.FC<Props> = ({ header, imageFixed, children }) => {
  return (
    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row my-16 items-center">
      <Img fixed={imageFixed} fadeIn={false}  />
      <div className="mx-4 sm:mx-12 prose mt-6 lg:mt-0">
        <h2>{header}</h2>
        {children}
      </div>
    </div>
  );
};

export default ImagePanel;
