import { useState } from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

export default function DeletePostModal({
    open,
    postId,
    handleDeletePost,
    closeDeleteModal,
}) {
    const handleDelete = () => {
        handleDeletePost(postId);
        closeDeleteModal();
    };

    return (
        <Modal open={open} onClose={closeDeleteModal}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                    <WarningRoundedIcon />
                    Confirmation
                </DialogTitle>
                <Divider />
                <DialogContent>
                    Are you sure you want to delete this post ?
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="solid"
                        color="danger"
                        onClick={handleDelete}
                    >
                        Confirm delete
                    </Button>
                    <Button
                        variant="plain"
                        color="neutral"
                        onClick={closeDeleteModal}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}
