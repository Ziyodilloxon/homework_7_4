import { Link } from "react-router-dom";

const links = [
  {
    id: 1,
    text: "Home",
    link: "/",
  },
  {
    id: 2,
    text: "About",
    link: "/about",
  },
  {
    id: 3,
    text: "Contact",
    link: "/contact",
  },
];
function NavLinks() {
  return (
    <>
      {links.map((link) => {
        return (
          <li
            className="btn btn-primary text-center font-semibold color-black  "
            key={link.id}
          >
            <Link to={link.link}>{link.text}</Link>
          </li>
        );
      })}
    </>
  );
}

export default NavLinks;
