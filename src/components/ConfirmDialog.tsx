import { Button, Typography } from '@material-tailwind/react';

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

export default function ConfirmDialog({ 
    header, 
    message, 
    confirmText, 
    confirmColor, 
    onConfirm, 
    dismissText, 
    dismissColor, 
    onDismiss, 
    open 
}: ConfirmDialogProps) {

    if (!open) return null;

    return (
        <>
            {/* Backdrop dengan animasi */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
            
            {/* Dialog Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-md mx-auto animate-in zoom-in-95 duration-200">
                    {/* Dialog Card */}
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Header Section */}
                        <div className="px-6 pt-6 pb-4 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            
                            <Typography variant="h4" className="text-gray-900 font-bold mb-2">
                                {header}
                            </Typography>
                        </div>

                        {/* Message Section */}
                        <div className="px-6 pb-6">
                            <Typography className="text-gray-600 text-center leading-relaxed text-base">
                                {message}
                            </Typography>
                        </div>

                        {/* Action Buttons */}
                        <div className="px-6 pb-6">
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                {/* Dismiss Button */}
                                <Button
                                    onClick={onDismiss}
                                    variant="outline"
                                    className={`
                                        flex-1 py-3 px-6 rounded-xl font-semibold text-sm
                                        border-2 border-${dismissColor}-200 text-${dismissColor}-700
                                        hover:bg-${dismissColor}-50 hover:border-${dismissColor}-300
                                        transition-all duration-200 ease-in-out
                                        focus:ring-4 focus:ring-${dismissColor}-100
                                        active:scale-98
                                    `}
                                >
                                    {dismissText || "Batalkan"}
                                </Button>

                                {/* Confirm Button */}
                                <Button
                                    onClick={onConfirm}
                                    className={`
                                        flex-1 py-3 px-6 rounded-xl font-semibold text-sm
                                        bg-gradient-to-r from-${confirmColor}-500 to-${confirmColor}-600
                                        text-white shadow-lg shadow-${confirmColor}-500/25
                                        hover:from-${confirmColor}-600 hover:to-${confirmColor}-700
                                        hover:shadow-xl hover:shadow-${confirmColor}-500/30
                                        transition-all duration-200 ease-in-out
                                        focus:ring-4 focus:ring-${confirmColor}-200
                                        active:scale-98
                                    `}
                                >
                                    {confirmText || "Konfirmasi"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}