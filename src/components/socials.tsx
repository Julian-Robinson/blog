import React from "react";

interface SocialLinkProps {
  href: string;
  className: string;
  newWindow?: boolean;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  className,
  newWindow,
}) => (
  <a href={href} target={newWindow ? "_blank" : null} rel="noopener noreferrer">
    <i className={"icon m-3 hover:text-blue-200 " + className}></i>
  </a>
);

const Socials: React.FC<{}> = () => (
  <div className="flex flex-row text-2xl m-8">
    <SocialLink
      href="https://github.com/Julian-Robinson"
      className="fab fa-github"
      newWindow
    />
    <SocialLink
      href="https://www.linkedin.com/in/julian-robinson"
      className="fab fa-linkedin"
      newWindow
    />
    <SocialLink
      href="mailto:contact@julianrobinson.nz?subject=Hi"
      className="far fa-envelope"
    />
  </div>
);

export default Socials;
