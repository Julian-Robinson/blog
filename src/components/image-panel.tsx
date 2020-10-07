import React, { ReactNode } from "react";
import Img, { FluidObject } from "gatsby-image";

type Props = {
  header: string;
  imageFluid?: FluidObject;
  children: ReactNode;
};

const ImagePanel: React.FC<Props> = ({ header, imageFluid, children }) => {
  return (
    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row my-16 items-center">
      <Img className="w-32" fadeIn={false} fluid={imageFluid} />
      <div className="mx-4 sm:mx-12 prose mt-6 lg:mt-0">
        <h2>{header}</h2>
        {children}
      </div>
    </div>
  );
};

export default ImagePanel;
