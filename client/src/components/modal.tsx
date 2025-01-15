import React, { ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


type ProjectModalProps = {
    name: string;
    isOpen: boolean;
    onClose: () => void;
    children:ReactNode;
  };

const Modal = ({ name, children, isOpen, onClose }:ProjectModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
            </DialogHeader> 
          {children}
          </DialogContent>
        </Dialog>
      );
}

export default Modal;
