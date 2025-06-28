import { AgGridReact } from 'ag-grid-react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
    ModuleRegistry,
    AllCommunityModule,
    ValidationModule,
    type ColDef,
    type GridApi,
    type ColGroupDef,
    type ValueGetterParams
} from "ag-grid-community";
import { CellSelectionModule, AllEnterpriseModule } from 'ag-grid-enterprise';
import type { CPTableType, ExtraTableType, ExtraMarkTableType, StudentTableType, SubjectMarksTableTypes, NotesAttendanceTableType } from '../types/TableTypes';

ModuleRegistry.registerModules([
    CellSelectionModule,
    AllEnterpriseModule,
    AllCommunityModule,
    ValidationModule
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
    formula?: (params: ValueGetterParams) => number;
    format?: (params: any) => string;
    wrapText?: boolean;
    centerHeader?: boolean;
    centerData?: boolean;
}

export interface ColHeaderGroupProps {
    headerName: string
    children?: ColHeaderProps[]

}

interface SheetProps {
    columnHeaders: (ColHeaderGroupProps | ColHeaderProps)[];
    isRowDeletable?: boolean
    colOtherProps?: ColOtherProps;
    initRowsData: CPTableType[] | ExtraTableType[] | ExtraMarkTableType[] | StudentTableType[];
    onRowDataChange?: (data: (CPTableType | ExtraTableType | ExtraMarkTableType | StudentTableType | SubjectMarksTableTypes | NotesAttendanceTableType)[], isDelete: boolean) => void;
    addRow?: any;
    isNumbered?: boolean;
    rowDeleteHandler?: (data: (CPTableType | ExtraTableType | ExtraMarkTableType | StudentTableType)[]) => void;
}

export interface TableGridRef {
    addRow: () => void;
}
export const SpreadsheetTable = forwardRef<TableGridRef, SheetProps>(({ columnHeaders, isRowDeletable, initRowsData, onRowDataChange, isNumbered }, ref) => {


    const generateColDefs = (headers: (ColHeaderProps | ColHeaderGroupProps)[]): (ColDef | ColGroupDef)[] => {
        return headers.map((f) => {
            if ('children' in f && f.children && f.children.length > 0) {
                // It's a header group
                return {
                    headerName: f.headerName,
                    children: generateColDefs(f.children)
                };
            } else {
                // It's a leaf column
                const col = f as ColHeaderProps;
                return {
                    field: col.field,
                    editable: col.editable,
                    headerName: col.headerName,
                    pinned: col.freeze,
                    width: col.width,
                    valueGetter: col.formula,
                    valueFormatter: col.format,
                    wrapText: col.wrapText,
                    headerClass: col.centerHeader ? "ag-center-header" : undefined,
                    cellClass: col.centerData ? "ag-center-cells" : undefined,
                    cellDataType: col.dataType,
                };
            }
        });
    };

    const [colDefs, setColDefs] = useState<ColDef[]>(generateColDefs(columnHeaders));
    const [_gridApi, setGridApi] = useState<GridApi | null>(null);

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


    const rows: (CPTableType | ExtraTableType | ExtraMarkTableType | StudentTableType)[] = []
    if (initRowsData) {
        rows.push(...initRowsData.map(row => ({ ...row, key: uuidv4() })));
    }
    else {
        throw Error("Initial Row Data is Empty")
    }
    useImperativeHandle(ref, () => ({
        addRow() {
            // Helper to flatten headers and get only leaf columns
            const getLeafHeaders = (headers: (ColHeaderProps | ColHeaderGroupProps)[]): ColHeaderProps[] => {
                const result: ColHeaderProps[] = [];
                headers.forEach(header => {
                    if ('children' in header && Array.isArray(header.children)) {
                        result.push(...getLeafHeaders(header.children));
                    } else {
                        result.push(header as ColHeaderProps);
                    }
                });
                return result;
            };

            const leafHeaders = getLeafHeaders(columnHeaders);

            const newRow: any = {};
            leafHeaders.forEach(header => {
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
    let [rowData, setRowData] = useState<(CPTableType | ExtraTableType | ExtraMarkTableType | StudentTableType)[]>(rows);

    useEffect(() => {
        setRowData(rows);

    }, [initRowsData]);

    return (
        <div className="w-full h-fit">
            <AgGridReact
                domLayout='autoHeight'
                columnDefs={colDefs}
                rowData={rowData}
                cellSelection={true}
                allowContextMenuWithControlKey={true}
                undoRedoCellEditing={true}
                undoRedoCellEditingLimit={50}
                clipboardDelimiter={'\t'}
                processDataFromClipboard={(params) => {
                    const clipboardData = params.data;
                    const startCell = params.api.getFocusedCell();

                    if (!startCell || !clipboardData) return clipboardData;

                    const startRowIndex = startCell.rowIndex;
                    const rowsNeeded = startRowIndex + clipboardData.length;

                    const missingRows = rowsNeeded - rowData.length;

                    if (missingRows > 0) {
                        const newRows: any[] = [];

                        for (let i = 0; i < missingRows; i++) {

                            // Helper to flatten headers and get only leaf columns
                            const getLeafHeaders = (headers: (ColHeaderProps | ColHeaderGroupProps)[]): ColHeaderProps[] => {
                                const result: ColHeaderProps[] = [];
                                headers.forEach(header => {
                                    if ('children' in header && Array.isArray(header.children)) {
                                        result.push(...getLeafHeaders(header.children));
                                    } else {
                                        result.push(header as ColHeaderProps);
                                    }
                                });
                                return result;
                            };

                            const leafHeaders = getLeafHeaders(columnHeaders);

                            const newRow: any = {};
                            leafHeaders.forEach(header => {
                                switch (header.dataType) {
                                    case 'number': newRow[header.field] = 0; break;
                                    case 'boolean': newRow[header.field] = false; break;
                                    case 'date': newRow[header.field] = new Date(); break;
                                    case 'dateString': newRow[header.field] = new Date().toLocaleDateString(); break;
                                    default: newRow[header.field] = ''; break;
                                }
                            });
                            newRow.key = uuidv4();
                            newRows.push(newRow);
                        }

                        // 🔥 Use AG Grid API directly – NO React setState
                        params.api.applyTransaction({ add: newRows });

                        // Optionally sync with local state
                        const updated = [...rowData, ...newRows];
                        setRowData(updated);
                        if (onRowDataChange) onRowDataChange(updated, false);
                    }

                    return clipboardData;
                }}


                onGridReady={(params) => {
                    setGridApi(params.api);
                }}
                onCellValueChanged={(event) => {
                    if (onRowDataChange) {
                        const fullData: any[] = [];
                        event.api.forEachNode(node => fullData.push(node.data));
                        onRowDataChange(fullData, false);
                    }
                }}
            />
        </div>
    )
})

export default SpreadsheetTable