import React from "react";
import { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

interface SocialLinkProps {
  href: string;
  icon: IconType;
  newWindow?: boolean;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  icon: Icon,
  newWindow,
}) => (
  <a
    href={href}
    target={newWindow ? "_blank" : undefined}
    rel="noopener noreferrer"
  >
    <Icon className="icon m-3 hover:text-blue-200"></Icon>
  </a>
);

const Socials: React.FC<{}> = () => {
  return (
    <div className="flex flex-row text-2xl m-8">
      <SocialLink
        href="https://github.com/Julian-Robinson"
        icon={FaGithub}
        newWindow />
      <SocialLink
        href="https://www.linkedin.com/in/julian-robinson"
        icon={FaLinkedin}
        newWindow />
      <SocialLink
        href="mailto:contact@julianrobinson.nz?subject=Hi"
        icon={FaEnvelope} />
    </div>
  );
};

export default Socials;
