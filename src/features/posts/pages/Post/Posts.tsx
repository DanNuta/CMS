import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Card, Modal, PopUp, Button } from "../../../../components";
import { ROUTES_PATHS } from "../../../../routes";
import { getPosts, deletePost } from "../../../../api";

export const Posts: React.FC = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["posts"] });

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const { mutate, isSuccess } = useMutation({
    mutationFn: deletePost,
  });

  function openDeleteModalFn(id: number) {
    setOpenDeleteModal(true);
    setDeleteId(id);
  }

  function confirmDeletePost() {
    mutate(deleteId);
    setOpenDeleteModal(false);
  }

  return (
    <div className="posts">
      {isSuccess && (
        <PopUp type="succes">
          <p>Postarea a fost stearsa cu succes !!!</p>
        </PopUp>
      )}

      <Modal
        typeBtn="Confirm"
        onConfirm={confirmDeletePost}
        onClose={() => setOpenDeleteModal(false)}
        openModal={openDeleteModal}
      >
        <h3> Sunteti siguri ca doriti sa stergeti postare?</h3>
      </Modal>

      <div className="title-posts">
        <h1>Posts</h1>

        <Button type="primary">
          <Link to={`${ROUTES_PATHS.postCreate}`}>Add new post</Link>
        </Button>
      </div>

      <div className="card-parent">
        {data &&
          data?.map((item, i) => {
            return (
              <Card onDeletePost={openDeleteModalFn} data={item} key={i} />
            );
          })}
      </div>
    </div>
  );
};
