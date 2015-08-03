module ReportingTablesLite {
    jQuery.noConflict();

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
        columns: Column[];
        dt: DataTables.DataTable;
        rowTotalCount: number;
        rowLoadedCount: number;
        rows: {}[];
        indexToIDKey: {};
        indexIDPropertyName: string;
        reportHtmlID: string;
        columnsParam: ColumnMapping[];

        constructor(Title: string, indexProperty: string, targetHtmlTag: string) {
            var self = this;
            self.reportHtmlID = targetHtmlTag;
            self.title = Title;
            self.columns = [];
            self.indexToIDKey = {};
            self.indexIDPropertyName = indexProperty;
            self.rowTotalCount = 0;
            self.rowLoadedCount = 0;
            self.columnsParam = [];
        }

        public LoadColumns(columnSet: Column[]) {
            
                for (var colIndex in columnSet) {
                    var currColumn: Column = columnSet[colIndex];
                    this.columnsParam.push(new ColumnMapping(currColumn.name, currColumn.visible, currColumn.displayName));
                    jQuery(this.reportHtmlID + ' thead tr').append("<th class='rtl-" + currColumn.name + "'>" + currColumn.name + "</th>");
                    if (jQuery(this.reportHtmlID + ' tfoot tr').length > 0) {
                        jQuery(this.reportHtmlID + ' tfoot tr').append("<th class='rtl-" + currColumn.name + "'>" + currColumn.name + "</th>");
                    }
                }
                this.columns = columnSet;
      
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

    export class Column {
        name: string;
        displayName: string;
        type: ColumnType;
        order: number;
        visible: boolean;

        constructor(columnName: string,  order: number, columnDisplayName?: string, visible?: boolean, columnType?: ColumnType) {
            this.name = columnName;
            this.displayName = typeof columnDisplayName != "undefined" ? columnDisplayName: columnName  ;
            this.type = typeof columnType != "undefined" ? columnType :ColumnType.Undetermined;
            this.order = order;
            this.visible = typeof visible != "undefined" ? visible : true;
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
}