"use client"
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/Ui/dialog";
import FileUpload from "./FileUpload";
import {Button} from "../../Ui/button"
import { Label } from "../../Ui/label";
// import fileUploadService from "@/services/fileUpload.service";
export function Upload({ onAddFileLink,type }) {
    const [fileUploadResponse, setFileUploadResponse] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

    const handleFileLinkChange = async (fileUrl) => {
        try {
            const url = await fileUploadService.uploadSingle(fileUrl);
            console.log(url.data.fileUrl);

            if (url.status === 200) {
                setFileUploadResponse(url.data.fileUrl);
                setIsSaveButtonDisabled(false); // Enable the "Save" button when fileUploadResponse is available
            }
        } catch (error) {
            console.error('Error in deleting the question:', error);
            setIsSaveButtonDisabled(true); // Disable the "Save" button on error
        }
    }

    const handleAddClick = () => {

        onAddFileLink(fileUploadResponse);
        setModalOpen(false);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className=" rounded-md text-white">
                    <div className="flex flex-row items-center">
                        <button className="px-6 py-3 bg-[#36518F] rounded-full mt-2 text-white font-medium" onClick={() => setModalOpen(true)}>
                            Upload
                        </button>
                    </div>
                </div>
            </DialogTrigger>
            {modalOpen && (
                <DialogContent>
                    <div className="grid">
                        <div className="">
                            <Label htmlFor="videoLink" className="text-left text-lg">
                                Upload
                            </Label>
                            <div className="mt-6">
                                <FileUpload type={type} onFileUpload={handleFileLinkChange} />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className={`${isSaveButtonDisabled ? 'cursor-none' : 'cursor-pointer'} bg-[#36518F] text-white hover:bg-[#36518F]`}
                            onClick={() => {
                                setModalOpen(false);
                                handleAddClick();
                            }}
                            disabled={isSaveButtonDisabled} // Disable the button based on the state
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            )}
        </Dialog>
    );
}