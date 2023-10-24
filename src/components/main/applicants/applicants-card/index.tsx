import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import img from "../../../../images/img.jpg";
import applicantsCard from './index.module.css';

const BootstrapButton = styled(Button)({
  textTransform: "none",
});

const ApplicantsCard: React.FC<{}> = (): JSX.Element => {
  return (
    <div className={applicantsCard.card}>
      <div className={applicantsCard.description}>
        <div className={applicantsCard.info}>
          <img src={img} className={applicantsCard.img} alt="Фото" />
          <div className={applicantsCard.profile}>
            <h4 className={applicantsCard.name}>🔥 Анна Короткова</h4>
            <p className={applicantsCard.tag}>Санкт-Петербург, 24 года</p>
          </div>
        </div>
        <div className={applicantsCard.activity}>
          <div className={applicantsCard.activityResponse}>40</div>
          <div className={applicantsCard.activityTesting}>14</div>
          <div className={applicantsCard.activityInterview}>10</div>
        </div>
        <div className={applicantsCard.education}>
          <div className={applicantsCard.educationItem}>
            <span className={applicantsCard.span}>Курс: </span>Дизайнер интерфейсов
          </div>
          <div className={applicantsCard.educationItem}>
            <span className={applicantsCard.span}>Дата окончания: </span>июнь 2023
          </div>
          <div className={applicantsCard.educationItem}>
            <span className={applicantsCard.span}>Формат работы: </span>удаленный
          </div>
        </div>
      </div>
      <div className={applicantsCard.buttons}>
        <BootstrapButton className={applicantsCard.hide} variant="outlined">
          Скрыть
        </BootstrapButton>
        <BootstrapButton className={applicantsCard.add} variant="contained">
          Добавить
        </BootstrapButton>
      </div>
    </div>
  );
};

export default ApplicantsCard;