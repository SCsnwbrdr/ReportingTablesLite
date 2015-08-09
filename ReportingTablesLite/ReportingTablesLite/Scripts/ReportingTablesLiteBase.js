/// <reference path="../Typescript/globalDeclarations.ts"/>
/// <amd-dependency path="jquery.datatables" />
define(["require", "exports", "jquery", "jquery.datatables"], function (require, exports, jQuery) {
    var constants = {
        _string: "[object String]",
        _number: "[object Number]",
        _date: "[object Date]",
        _object: "[object object]"
    };
    var classes = {
        _hidden: "rtl-hidden"
    };
    var browsers = {
        _IE: "Microsoft Internet Explorer"
    };
    var Report = (function () {
        function Report(Title, indexProperty, targetHtmlTag) {
            var self = this;
            self.reportHtmlID = targetHtmlTag;
            self.title = Title;
            self.indexToIDKey = {};
            self.indexIDPropertyName = indexProperty;
            self.rowTotalCount = 0;
            self.rowLoadedCount = 0;
            self.columnsParam = [];
        }
        Report.prototype.LoadColumns = function (columnSet) {
            for (var colIndex in columnSet) {
                var currColumn = columnSet[colIndex];
                this.columnsParam.push(currColumn);
                jQuery(this.reportHtmlID + ' thead tr').append("<th class='rtl-" + currColumn.data + "'>" + currColumn.data + "</th>");
                if (jQuery(this.reportHtmlID + ' tfoot tr').length > 0) {
                    jQuery(this.reportHtmlID + ' tfoot tr').append("<th class='rtl-" + currColumn.data + "'>" + currColumn.data + "</th>");
                }
            }
        };
        Report.prototype.LoadData = function (dataSet) {
            var self = this;
            self.dt = jQuery(this.reportHtmlID).DataTable({
                columns: self.columnsParam
            });
            for (var index in dataSet) {
                this.dt.row.add(dataSet[index]).draw();
            }
        };
        return Report;
    })();
    exports.Report = Report;
    var ColumnMapping = (function () {
        function ColumnMapping(value, visible, title) {
            this.data = value;
            this.visible = visible === undefined ? true : visible;
            if (title)
                this.title = title;
        }
        return ColumnMapping;
    })();
    exports.ColumnMapping = ColumnMapping;
    (function (ColumnType) {
        ColumnType[ColumnType["Undetermined"] = 0] = "Undetermined";
        ColumnType[ColumnType["String"] = 1] = "String";
        ColumnType[ColumnType["Number"] = 2] = "Number";
        ColumnType[ColumnType["Date"] = 3] = "Date";
    })(exports.ColumnType || (exports.ColumnType = {}));
    var ColumnType = exports.ColumnType;
});
//# sourceMappingURL=ReportingTablesLiteBase.js.map