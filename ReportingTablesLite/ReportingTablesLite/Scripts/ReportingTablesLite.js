var ReportingTablesLite;
(function (ReportingTablesLite) {
    jQuery.noConflict();
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
            self.columns = [];
            self.indexToIDKey = {};
            self.indexIDPropertyName = indexProperty;
            self.rowTotalCount = 0;
            self.rowLoadedCount = 0;
            self.columnsParam = [];
        }
        Report.prototype.LoadColumns = function (columnSet) {
            for (var colIndex in columnSet) {
                var currColumn = columnSet[colIndex];
                this.columnsParam.push(new ColumnMapping(currColumn.name, currColumn.visible, currColumn.displayName));
                jQuery(this.reportHtmlID + ' thead tr').append("<th class='rtl-" + currColumn.name + "'>" + currColumn.name + "</th>");
                if (jQuery(this.reportHtmlID + ' tfoot tr').length > 0) {
                    jQuery(this.reportHtmlID + ' tfoot tr').append("<th class='rtl-" + currColumn.name + "'>" + currColumn.name + "</th>");
                }
            }
            this.columns = columnSet;
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
    ReportingTablesLite.Report = Report;
    var Column = (function () {
        function Column(columnName, order, columnDisplayName, visible, columnType) {
            this.name = columnName;
            this.displayName = typeof columnDisplayName != "undefined" ? columnDisplayName : columnName;
            this.type = typeof columnType != "undefined" ? columnType : 0 /* Undetermined */;
            this.order = order;
            this.visible = typeof visible != "undefined" ? visible : true;
        }
        return Column;
    })();
    ReportingTablesLite.Column = Column;
    var ColumnMapping = (function () {
        function ColumnMapping(value, visible, title) {
            this.data = value;
            this.visible = visible === undefined ? true : visible;
            if (title)
                this.title = title;
        }
        return ColumnMapping;
    })();
    ReportingTablesLite.ColumnMapping = ColumnMapping;
    (function (ColumnType) {
        ColumnType[ColumnType["Undetermined"] = 0] = "Undetermined";
        ColumnType[ColumnType["String"] = 1] = "String";
        ColumnType[ColumnType["Number"] = 2] = "Number";
        ColumnType[ColumnType["Date"] = 3] = "Date";
    })(ReportingTablesLite.ColumnType || (ReportingTablesLite.ColumnType = {}));
    var ColumnType = ReportingTablesLite.ColumnType;
})(ReportingTablesLite || (ReportingTablesLite = {}));
//# sourceMappingURL=ReportingTablesLite.js.map