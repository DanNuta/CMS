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
  const lengthDescription = data?.description?.length! > 100 ? "..." : "";

  return (
    <div className="card">
      <div className="card__img">
        <img src={data.linkImage} />

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

      <Link to={navigateToPost.gotoPostDetails(data.id)}>
        <div className="card__body">
          <div className="title">
            <div className="title-edit">
              <h1>{data.title}</h1>
            </div>
            <p className="date">{data.date}</p>
          </div>

          <div className="description">
            <p>
              {data.description?.slice(0, 100)}
              {lengthDescription}
            </p>
          </div>

          <div className="author">
            <p>
              Author:
              <span>
                {data.author.name} {data.author.prenume}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
