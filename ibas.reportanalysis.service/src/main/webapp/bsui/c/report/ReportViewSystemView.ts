/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace ui {
        export namespace c {
            export interface ISystemReportView {
                runReportEvent: Function;
                resetReportEvent: Function;
                fireViewEvents(event: Function, ...pars: any[]): void;
                dataTable: ibas.DataTable;
            }
            function createPage(that: ISystemReportView, form: sap.m.VBox): sap.m.Page {
                return new sap.m.Page("", {
                    showHeader: false,
                    subHeader: new sap.m.Toolbar("", {
                        content: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_run"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://begin",
                                press: function (): void {
                                    that.fireViewEvents(that.runReportEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_reset"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://reset",
                                press: function (): void {
                                    that.fireViewEvents(that.resetReportEvent);
                                }
                            }),
                            new sap.m.ToolbarSpacer(""),
                            new sap.m.Button("", {
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://action",
                                press: function (event: any): void {
                                    ibas.servicesManager.showServices({
                                        proxy: new ibas.DataTableServiceProxy({
                                            data: that.dataTable,
                                        }),
                                        displayServices(services: ibas.IServiceAgent[]): void {
                                            if (ibas.objects.isNull(services) || services.length === 0) {
                                                return;
                                            }
                                            let popover: sap.m.Popover = new sap.m.Popover("", {
                                                showHeader: false,
                                                placement: sap.m.PlacementType.Bottom,
                                            });
                                            for (let service of services) {
                                                popover.addContent(new sap.m.Button({
                                                    text: ibas.i18n.prop(service.name),
                                                    type: sap.m.ButtonType.Transparent,
                                                    icon: service.icon,
                                                    press: function (): void {
                                                        service.run();
                                                        popover.close();
                                                    }
                                                }));
                                            }
                                            (<any>popover).addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");
                                            popover.openBy(event.getSource(), true);
                                        }
                                    });
                                }
                            })
                        ]
                    }),
                    content: [
                        form
                    ]
                });
            }
            function createTableResult(table: ibas.DataTable): sap.ui.table.Table {
                let tableResult: sap.ui.table.Table = new sap.ui.table.Table("", {
                    enableSelectAll: true,
                    selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                    visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                    visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                    editable: false,
                    rows: "{/rows}",
                });
                for (let index: number = 0; index < table.columns.length; index++) {
                    let col: ibas.DataTableColumn = table.columns[index];
                    if (ibas.strings.isEmpty(col.description)) {
                        col.description = ibas.i18n.prop(col.name);
                        if (col.description.startsWith("[") && col.description.endsWith("]")) {
                            col.description = col.name;
                        }
                    } else {
                        let value: string = col.description;
                        col.description = ibas.i18n.prop(col.description);
                        if (col.description.startsWith("[") && col.description.endsWith("]")) {
                            col.description = value;
                        }
                    }
                    if (col.definedDataType() === ibas.emTableDataType.DATE) {
                        tableResult.addColumn(
                            new sap.ui.table.Column("", {
                                label: ibas.strings.isEmpty(col.description) ? col.name : col.description,
                                width: "100px",
                                autoResizable: false,
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: index.toString(),
                                    formatter(data: any): any {
                                        return ibas.dates.toString(data);
                                    }
                                })
                            })
                        );
                    } else {
                        tableResult.addColumn(
                            new sap.ui.table.Column("", {
                                label: ibas.strings.isEmpty(col.description) ? col.name : col.description,
                                width: "100px",
                                autoResizable: false,
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: index.toString(),
                                })
                            })
                        );
                    }
                }
                tableResult.setModel(new sap.ui.model.json.JSONModel({ rows: table.convert({ format: true, nameAs: "index" }) }));
                return tableResult;
            }
            /**
             * 视图-Report
             */
            export class SystemReportViewView extends ReportViewView implements app.ISystemReportViewView, ISystemReportView {
                /** 重置报表 */
                resetReportEvent: Function;
                fireViewEvents(event: Function, ...pars: any[]): void {
                    super.fireViewEvents(event, pars);
                }
                /** 绘制视图 */
                draw(): any {
                    this.form = new sap.m.VBox("", {
                        justifyContent: sap.m.FlexJustifyContent.Center,
                        alignItems: sap.m.FlexAlignItems.Center,
                    });
                    return createPage(this, this.form);
                }
                dataTable: ibas.DataTable;
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    this.form.destroyItems();
                    this.form.addItem(createTableResult(table));
                    this.dataTable = table;
                }
            }

            /**
             * 视图-报表查看-页签
             */
            export class SystemReportViewTabView extends ReportViewTabView implements app.ISystemReportViewView, ISystemReportView {
                /** 重置报表 */
                resetReportEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    this.form = new sap.m.VBox("", {
                        justifyContent: sap.m.FlexJustifyContent.Center,
                        alignItems: sap.m.FlexAlignItems.Center,
                    });
                    return createPage(this, this.form);
                }
                dataTable: ibas.DataTable;
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    this.form.destroyItems();
                    this.form.addItem(createTableResult(table));
                    this.dataTable = table;
                }
                fireViewEvents(event: Function, ...pars: any[]): void {
                    super.fireViewEvents(event, pars);
                }
            }
            /**
             * 视图-报表查看
             */
            export class SystemReportViewDialogView extends ReportViewDialogView implements app.ISystemReportViewDialogView {
                /** 重置报表 */
                resetReportEvent: Function;
                /** 选择数据 */
                chooseDataEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.form = new sap.m.VBox("", {
                        justifyContent: sap.m.FlexJustifyContent.Center,
                        alignItems: sap.m.FlexAlignItems.Center,
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretchOnPhone: true,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_run"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://begin",
                                    press: function (): void {
                                        that.fireViewEvents(that.runReportEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_reset"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://reset",
                                    press: function (): void {
                                        that.fireViewEvents(that.resetReportEvent);
                                    }
                                }),
                            ]
                        }),
                        content: [this.form],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_confirm"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    if (ibas.objects.isNull(that.table) || ibas.objects.isNull(that.dataTable)) {
                                        return;
                                    }
                                    let indices: number[] = that.table.getSelectedIndices();
                                    if ((indices instanceof Array) && indices.length > 0) {
                                        that.fireViewEvents(that.chooseDataEvent, that.dataTable.clone(indices));
                                    }
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    });
                }
                private table: sap.ui.table.Table;
                private dataTable: ibas.DataTable;
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    this.form.destroyItems();
                    this.table = createTableResult(table);
                    this.form.addItem(this.table);
                    this.dataTable = table;
                }
            }
        }
    }
}