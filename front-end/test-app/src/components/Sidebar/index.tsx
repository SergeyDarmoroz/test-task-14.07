import { Link } from "react-router-dom";

type SidebarItem = {
    id: number,
    path: string,
    label: string
}

export const Sidebar = () => {

  const sidebarItems: SidebarItem[] = [{
    id: 1,
    path: '/',
    label: 'Products'
  }, {
    id: 2,
    path: '/reviews',
    label: 'Reviews'
  }];

  return (
    <div
      className="d-flex flex-column vh-100 flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "200px" }}
    >
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
      {sidebarItems.map(item => (
        <li key={item.id} className="nav-item">
          <Link to={item.path} className={`nav-link text-white`}>
            <span className="ms-2">{item.label}</span>
          </Link>
        </li>
      ))}
      </ul>
      <hr />
    </div>
  );
};
