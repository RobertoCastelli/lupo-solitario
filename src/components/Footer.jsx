import { FaGlobe, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <p>roberto castelli 2026</p>
      <ul>
        <li>
          <a
            href="https://robertocastelli.dev/about"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repository GitHub"
          >
            <FaGlobe size={15} />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/RobertoCastelli/lupo-solitario"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repository GitHub"
          >
            <FaGithub size={15} />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/roberto-castelli-teal/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repository GitHub"
          >
            <FaLinkedin size={15} />
          </a>
        </li>
      </ul>
      <p>
        Fan project non ufficiale di Lupo Solitario, senza scopo di lucro. Tutti
        i diritti appartengono ai rispettivi proprietari.
      </p>
    </footer>
  );
};

export default Footer;
