import { Link } from "react-router-dom";

import { PostProps } from "../../types";
import Delete from "../../icons/delete.svg";
import Edit from "../../icons/edit.svg";
import { Button } from "../../components/Button/Button";
import { navigateToPost } from "../../routes";

interface CardProps {
  data: PostProps;
  onDeletePost: (id: number) => void;
}

export const Card: React.FC<CardProps> = ({ data, onDeletePost }) => {
  return (
    <div className="card">
      <div>
        <div className="title-edit">
          <h1>{data.title}</h1>
          <div className="btn">
            <Button onClick={() => onDeletePost(data.id)} dimension="none">
              <img src={Delete} alt="" />
            </Button>
            <Button dimension="none">
              <Link to={navigateToPost.gotoPostEdit(data.id)}>
                <img src={Edit} alt="" />
              </Link>
            </Button>
          </div>
        </div>

        <p>{data.date}</p>
      </div>

      <div className="description">
        <p>{data.description}</p>
      </div>

      <div>
        <img src={data.linkImage} />
      </div>

      <div>
        <p>
          Link catre poza:{" "}
          <span>
            <a href={data.linkImage!} target="_blank">
              img
            </a>
          </span>
        </p>
      </div>

      <div>
        <p>
          Author: {data.author.name} {data.author.prenume}
        </p>
      </div>
    </div>
  );
};
