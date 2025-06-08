import React from 'react';

type ConfirmDialogProps = {
    header: string;
    message: string;
    confirmText?: string;
    confirmColor: string;
    onConfirm?: () => void;
    dismissText: string;
    dismissColor: string;
    onDismiss: () => void;
    open: boolean;
}
import { Button, Dialog, Typography } from '@material-tailwind/react';

export default function ConfirmDialog({ header, message, confirmText, confirmColor, onConfirm, dismissText, dismissColor, onDismiss, open }: ConfirmDialogProps) {

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-100 opacity-50 z-10">
            <Dialog
                open={open}
            >
                <Dialog.Overlay

                >
                    <Dialog.Content>
                        <div className='flex flex-col items-center justify-center h-full'>
                            <Typography variant="h5" className="mb-4">
                                <strong>{header}</strong>
                            </Typography>
                        </div>
                        <Typography className="text-center mb-4">
                            {message}
                        </Typography>
                        <div className='flex justify-center space-x-4'>
                            <Dialog.DismissTrigger as={Button} onClick={onDismiss} className={`bg-${dismissColor}-500 text-white px-4 py-2 rounded hover:bg-blue-600`} >
                                {dismissText || "Batalkan"}
                            </Dialog.DismissTrigger>
                            <Button className={`bg-${confirmColor}-500 text-white px-4 py-2 rounded hover:bg-red-600`}
                                onClick={onConfirm}
                            >
                                {confirmText || "Konfirmasi"}

                            </Button>
                        </div>
                    </Dialog.Content>

                </Dialog.Overlay>
            </Dialog>

        </div >
    )
}