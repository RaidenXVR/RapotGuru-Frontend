import { AgGridReact } from 'ag-grid-react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
    ClientSideRowModelApiModule,
    ClientSideRowModelModule,
    ColDef,
    RowApiModule,
    ModuleRegistry,
    NumberEditorModule,
    TextEditorModule,
    ValidationModule,
    CellStyleModule,
    GridReadyEvent,
    GridApi,
} from "ag-grid-community";
import { CPTableType, ExtraTableType, ExtraMarkTableType } from '../types/TableTypes';
import { Student } from '../types/Student';

ModuleRegistry.registerModules([
    NumberEditorModule,
    TextEditorModule,
    ClientSideRowModelApiModule,
    ClientSideRowModelModule,
    RowApiModule,
    CellStyleModule,
    ValidationModule,/* Development Only */
]);

interface ColOtherProps {

}

export interface ColHeaderProps {
    field: string;
    headerName: string;
    editable: boolean;
    freeze?: boolean;
    dataType: 'text' | 'number' | 'boolean' | 'date' | 'dateString' | 'object';
    width?: number;
    formula?: (params: any) => number;
    format?: (params: any) => string;
    wrapText?: boolean;
    centerHeader?: boolean;
    centerData?: boolean;


}

interface SheetProps {
    columnHeaders: ColHeaderProps[];
    isRowDeletable?: boolean
    colOtherProps?: ColOtherProps;
    initRowsData: CPTableType[] | ExtraTableType[] | ExtraMarkTableType[];
    onRowDataChange?: (data: (CPTableType | ExtraTableType | ExtraMarkTableType)[], isDelete: boolean) => void;
    addRow?: any;
    isNumbered?: boolean;
    rowDeleteHandler?: (data: (CPTableType | ExtraTableType | ExtraMarkTableType)[]) => void;
}

export interface TableGridRef {
    addRow: () => void;
}
export const SpreadsheetTable = forwardRef<TableGridRef, SheetProps>(({ columnHeaders, isRowDeletable, initRowsData, onRowDataChange, isNumbered }, ref) => {


    const generateColDefs = (headers: ColHeaderProps[]): ColDef[] => {
        return headers.map((f) => ({
            field: f.field,
            editable: f.editable,
            headerName: f.headerName,
            pinned: f.freeze,
            width: f.width,
            valueGetter: f.formula,
            valueFormatter: f.format,
            wrapText: f.wrapText,
            headerClass: f.centerHeader ? "ag-center-header" : undefined,
            cellClass: f.centerData ? "ag-center-cells" : undefined,
            cellDataType: f.dataType
        }));
    };

    const [colDefs, setColDefs] = useState<ColDef[]>(generateColDefs(columnHeaders));
    const [gridApi, setGridApi] = useState<GridApi | null>(null);

    useEffect(() => {
        setColDefs(generateColDefs(columnHeaders));
        if (isNumbered) {
            setColDefs(prev => [{
                headerName: '#',
                valueGetter: (params) => params.node ? params.node.rowIndex! + 1 : null,
                width: 50,
                editable: false,
                pinned: 'left',
            }, ...prev]);
        }
        if (isRowDeletable) {
            setColDefs(prev => [...prev,
            {
                field: "delete",
                editable: false,
                width: 100,
                pinned: 'right',
                cellRenderer: (params: any) => (
                    <button
                        onClick={() => handleDeleteRow(params.data.key)}
                        style={{ width: '50px', padding: '2px 6px', backgroundColor: '#d33', color: 'white', border: 'none', borderRadius: '3px' }}
                    >
                        ✕
                    </button>
                ),
            }]
            )
        }
    }, [columnHeaders]);



    const handleDeleteRow = useCallback((idToDelete: string) => {
        setRowData(prev => {
            const updatedRowData = prev.filter(row => row.key !== idToDelete);

            if (onRowDataChange) {
                onRowDataChange(updatedRowData, true);
            }
            return updatedRowData;
        });
    }, []);


    const rows: (CPTableType | ExtraTableType | ExtraMarkTableType)[] = []
    if (initRowsData) {
        rows.push(...initRowsData.map(row => ({ ...row, key: uuidv4() })));
    }
    else {
        throw Error("Initial Row Data is Empty")
    }
    useImperativeHandle(ref, () => ({
        addRow() {
            const newRow: any = {};
            columnHeaders.forEach(header => {
                switch (header.dataType) {
                    case 'number':
                        newRow[header.field] = 0;
                        break;
                    case 'boolean':
                        newRow[header.field] = false;
                        break;
                    case 'date':
                        newRow[header.field] = new Date();
                        break;
                    case 'dateString':
                        newRow[header.field] = new Date().toLocaleDateString();
                        break;
                    default:
                        newRow[header.field] = '';
                        break;
                }
            });
            newRow.key = uuidv4();
            setRowData(prev => [...prev, newRow]);
        }
    }));

    let [rowData, setRowData] = useState<(CPTableType | ExtraTableType | ExtraMarkTableType)[]>(rows);

    useEffect(() => {
        setRowData(rows);

    }, [initRowsData]);


    const onGridReady = useCallback((params: GridReadyEvent) => {
        setGridApi(params.api);
    }, []);

    const onPasteStart = useCallback((params: any) => {
        const pastedData = params.data;
        const numPastedRows = pastedData.length;

        setRowData(prev => {
            const existingRows = [...prev];
            const numExistingRows = existingRows.length;

            if (numPastedRows > numExistingRows) {
                // Add new rows if pasted data has more rows than existing rows
                const rowsToAdd = numPastedRows - numExistingRows;
                for (let i = 0; i < rowsToAdd; i++) {
                    const newRow: any = {};
                    columnHeaders.forEach(header => {
                        switch (header.dataType) {
                            case 'number':
                                newRow[header.field] = 0;
                                break;
                            case 'boolean':
                                newRow[header.field] = false;
                                break;
                            case 'date':
                                newRow[header.field] = new Date();
                                break;
                            case 'dateString':
                                newRow[header.field] = new Date().toLocaleDateString();
                                break;
                            default:
                                newRow[header.field] = '';
                                break;
                        }
                    });
                    newRow.key = uuidv4();
                    existingRows.push(newRow);
                }
            }
            // Update pasted values to existing rows
            pastedData.forEach((pasteRow: any, index: number) => {
                if (existingRows[index]) {
                    columnHeaders.forEach(header => {
                        (existingRows[index] as Record<string, any>)[header.field] = pasteRow[columnHeaders.indexOf(header)];
                    });
                }
            });

            return existingRows;
        });
    }, [columnHeaders, setRowData]);


    return (
        <div className="w-full h-fit">
            <AgGridReact
                domLayout='autoHeight'
                columnDefs={colDefs}
                rowData={rowData}
                // onPasteStart={onPasteStart}
                // cellSelection
                // onGridReady={onGridReady}
                // rowSelection={'multiple'}
                cellSelection={true}
                onCellValueChanged={(event) => {
                    const updatedData = event.api.getRenderedNodes().map(node => {
                        return node.data
                    });
                    setRowData(updatedData); // Keep internal state in sync
                    if (onRowDataChange) onRowDataChange(updatedData, false);
                }}
            />
        </div>
    )
})

export default SpreadsheetTable