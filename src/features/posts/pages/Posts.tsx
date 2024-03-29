import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Card, Modal, PopUp, Button, PageCard, Loading } from "@/components";
import { ROUTES_PATHS } from "@/routes";
import { getPosts, deletePost } from "@/api";
import { succesMsj, confirmMjs } from "@/utils";

export const Posts: React.FC = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string>();

  const queryClient = useQueryClient();

  const { data } = useQuery(["posts"], getPosts);

  const { mutate, isSuccess } = useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  function openDeleteModalFn(id: string) {
    setOpenDeleteModal(true);
    setDeleteId(id);
  }

  function confirmDeletePost() {
    if (deleteId === undefined) return;
    mutate(deleteId);
    setOpenDeleteModal(false);
  }

  const btn = (
    <Button element="href" butontype="primary" dimension="default">
      <Link className="link" to={`${ROUTES_PATHS.postCreate}`}>
        Add new post
      </Link>
    </Button>
  );

  return (
    <>
      {data ? (
        <PageCard title={`Posts, ${data?.length}`} extra={btn}>
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
            {data.map((item, i) => {
              return (
                <Card onDeletePost={openDeleteModalFn} {...item} key={i} />
              );
            })}
          </div>
        </PageCard>
      ) : (
        <Loading />
      )}
    </>
  );
};
