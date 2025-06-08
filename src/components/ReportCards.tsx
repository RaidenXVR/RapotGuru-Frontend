import { Button } from "@material-tailwind/react";
import ReportList from "./ReportList";
import { useNavigate } from "react-router-dom";

export default function ReportCards() {

    const navigate = useNavigate();

    return (
        <div>
            <div className="w-full justify-end flex-1">
                <Button className="flex ml-3 object-right p-3 bg-green-500"
                    onClick={() => navigate('/report-cards/new')}
                >
                    <h1>+ Tambah Rapot</h1>
                </Button>
            </div>
            <ReportList />
        </div>
    );
}