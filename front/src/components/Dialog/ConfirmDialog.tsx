import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

const ConfirmDialog = ({
  isOpen,
  onConfirm,
  onClose,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  return (
    <Dialog.Root
      lazyMount
      open={isOpen}
      onOpenChange={() => {
        onClose();
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Confirm</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>Are you sure?</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={onConfirm}>Confirm</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default ConfirmDialog;
