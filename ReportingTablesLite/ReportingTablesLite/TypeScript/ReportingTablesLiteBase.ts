/// <reference path="../Typescript/globalDeclarations.ts"/>
/// <amd-dependency path="datatables" />

import jQuery = require("jquery");
import DataTables = require("datatables");

    var constants = {
        _string: "[object String]",
        _number: "[object Number]",
        _date: "[object Date]",
        _object: "[object object]"
    }

    var classes = {
        _hidden: "rtl-hidden"
    }

    var browsers = {
        _IE: "Microsoft Internet Explorer"
    }

    export class Report {
        title: string;
        dt: DataTables.DataTable;
        rowTotalCount: number;
        rowLoadedCount: number;
        indexToIDKey: {};
        indexIDPropertyName: string;
        reportHtmlID: string;
        columnsParam: ColumnMapping[];

        constructor(Title: string, indexProperty: string, targetHtmlTag: string) {
            var self = this;
            self.reportHtmlID = targetHtmlTag;
            self.title = Title;
            self.indexToIDKey = {};
            self.indexIDPropertyName = indexProperty;
            self.rowTotalCount = 0;
            self.rowLoadedCount = 0;
            self.columnsParam = [];
        }

        public LoadColumns(columnSet: ColumnMapping[]) {
            
                for (var colIndex in columnSet) {
                    var currColumn: ColumnMapping = columnSet[colIndex];
                    this.columnsParam.push(currColumn);
                    jQuery(this.reportHtmlID + ' thead tr').append("<th class='rtl-" + currColumn.data + "'>" + currColumn.data + "</th>");
                    if (jQuery(this.reportHtmlID + ' tfoot tr').length > 0) {
                        jQuery(this.reportHtmlID + ' tfoot tr').append("<th class='rtl-" + currColumn.data + "'>" + currColumn.data + "</th>");
                    }
                }
        }

        public LoadData(dataSet: any[]) {
            var self = this;
            self.dt = jQuery(this.reportHtmlID).DataTable({
                columns: self.columnsParam
            });
            for (var index in dataSet) {
                this.dt.row.add(dataSet[index]).draw();
            }
            
        }
    }

    export class ColumnMapping implements DataTables.ColumnSettings {
        data: string;
        visible: boolean;
        title: string;
        constructor(value: string, visible?: boolean, title?: string) {
            this.data = value;
            this.visible = visible === undefined ? true : visible;
            if(title)
                this.title = title;
        }
    }

    export enum ColumnType {
        Undetermined,
        String,
        Number,
        Date
    }
