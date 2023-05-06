import { PostProps } from "../../types";
import Delete from "../../icons/delete.svg";
import Edit from "../../icons/edit.svg";
import { Button } from "../../components/Button/Button";

interface CardProps {
  data: PostProps;
}

export const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="card">
      <div>
        <div className="title-edit">
          <h1>{data.title}</h1>
          <div className="btn">
            <Button dimension="none">
              <img src={Delete} alt="" />
            </Button>
            <Button dimension="none">
              <img src={Edit} alt="" />
            </Button>
          </div>
        </div>

        <p>{data.date}</p>
      </div>

      <div className="description">
        <p>{data.description}</p>
      </div>

      <div>
        <p>
          Author: {data.author.name} {data.author.prenume}
        </p>
      </div>
    </div>
  );
};
