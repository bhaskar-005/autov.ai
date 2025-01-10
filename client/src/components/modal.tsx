import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


type ProjectModalProps = {
    name: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
  };

const Modal = ({ name, description, isOpen, onClose }:ProjectModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600">{description}</p>
            <Button variant="default" className="mt-4" onClick={onClose}>
              Close
            </Button>
          </DialogContent>
        </Dialog>
      );
}

export default Modal;
