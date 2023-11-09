import { Link } from "react-router-dom";

import { PostProps } from "@/types";
import { DeleteImage, EditImage } from "@/icons";
import { Button } from "@/components/Button/Button";
import { navigateToPost } from "@/routes";
import { useAuth } from "@/context";

interface CardProps extends PostProps {
  onDeletePost: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({ ...props }) => {
  const lengthDescription = props.description?.length > 100 ? "..." : "";

  const { user } = useAuth();

  return (
    <div className="card">
      <div className="image-container">
        <Link
          className="card__link"
          to={navigateToPost.gotoPostDetails(props._id)}
        >
          <img className="image-container__image" src={props.img} />
        </Link>

        {(props.author?.id === user?._id || user?.rol === "administrator") && (
          <div
            onClick={(e) => e.preventDefault()}
            className="image-container__btns"
          >
            <Button
              butontype="neutral"
              element="img"
              dimension="default"
              onClick={() => props.onDeletePost(props._id)}
            >
              <DeleteImage />
            </Button>

            <Button butontype="neutral" element="img" dimension="default">
              <Link to={navigateToPost.gotoPostEdit(props._id)}>
                <EditImage />
              </Link>
            </Button>
          </div>
        )}
      </div>

      <Link
        className="card__link"
        to={navigateToPost.gotoPostDetails(props._id)}
      >
        <div className="body">
          <div className="body__title">
            <h1 className="body__title-post">{props.title}</h1>
            <p className="body__date-post">{props.date}</p>
          </div>

          <div className="body__description">
            <p className="body__description-title">
              {props.description?.slice(0, 100)}
              {lengthDescription}
            </p>
          </div>

          {props.author?.name && (
            <div className="body__author">
              <p className="body__author-label">
                Author: &nbsp;
                <span className="body__author-info">
                  {props?.author?.name} {props?.author?.prenume}
                </span>
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
