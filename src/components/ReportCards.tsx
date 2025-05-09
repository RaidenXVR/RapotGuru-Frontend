import { Button } from "@material-tailwind/react";
import ReportList from "./ReportList";

export default function ReportCards() {


    return (
        <div>
            <div className="w-full justify-end flex-1">
                <Button className="flex ml-3 object-right p-3 bg-green-500">
                    <h1>+ Tambah Rapot</h1>
                </Button>
            </div>
            <ReportList />
        </div>
    );
}