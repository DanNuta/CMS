import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Card,
  Modal,
  PopUp,
  Button,
  PageCard,
  Loading,
} from "@/components";
import { ROUTES_PATHS } from "@/routes";
import { getPosts, deletePost } from "@/api";
import { succesMsj, confirmMjs } from "@/utils";

export const Posts: React.FC = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();

  const queryClient = useQueryClient();

  const { data, status } = useQuery(["posts"], getPosts);

  const { mutate, isSuccess } = useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  function openDeleteModalFn(id: number) {
    setOpenDeleteModal(true);
    setDeleteId(id);
  }

  function confirmDeletePost() {
    if (deleteId === undefined) return;
    mutate(deleteId);
    setOpenDeleteModal(false);
  }

  const btn = (
    <Button element="href" type="primary" dimension="none">
      <Link to={`${ROUTES_PATHS.postCreate}`}>Add new post</Link>
    </Button>
  );

  return (
    <PageCard title="Posts" extra={btn}>
      {isSuccess && (
        <PopUp type="succes">
          <p>{succesMsj.succesDeletedPost}</p>
        </PopUp>
      )}

      <Modal
        typeBtn="Confirm"
        onConfirm={confirmDeletePost}
        onClose={() => setOpenDeleteModal(false)}
        openModal={openDeleteModal}
      >
        <h3>{confirmMjs.confirmDeletePost}</h3>
      </Modal>

      <div className="card-parent">
        {status === "loading" ? (
          <Loading />
        ) : (
          data?.map((item, i) => {
            return (
              <Card onDeletePost={openDeleteModalFn} data={item} key={i} />
            );
          })
        )}
      </div>
    </PageCard>
  );
};
