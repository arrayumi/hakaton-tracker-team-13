import applicants from "./index.module.css";
import ApplicantsCard from "./applicants-card";
import page from "../index.module.css";
import { cardsList } from "../../../constants/cardsList";

const Applicants: React.FC<{}> = (): JSX.Element => {
  return (
    <div className={`${page.pageElement} ${applicants.container}`}>
      <h2 className={applicants.title}>Соискатели</h2>
      <ul className={applicants.list}>
      {cardsList.map((element: { name: string; city: string, age: string }, index) => {
        return (
          <li>
            <ApplicantsCard
              key={index}
              name={element.name}
              city={element.city}
              age={element.age}
            />
          </li>
        );
      })}
      </ul>
    </div>

  );
};

export default Applicants;
