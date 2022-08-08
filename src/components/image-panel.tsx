import React, { ReactElement, ReactNode } from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

type Props = {
  header: string;
  image: ReactNode;
  children: ReactNode;
};

const ImagePanel: React.FC<Props> = ({ header, image, children }) => {
  return (
    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row my-16 items-center">
      {image}
      <div className="mx-4 sm:mx-12 prose mt-6 lg:mt-0">
        <h2>{header}</h2>
        {children}
      </div>
    </div>
  );
};

export default ImagePanel;
