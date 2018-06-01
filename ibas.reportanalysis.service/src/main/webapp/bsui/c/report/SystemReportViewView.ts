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
            /**
             * 视图-Report
             */
            export class SystemReportViewView extends ReportViewView implements app.ISystemReportViewView {
                /** 重置报表 */
                resetReportEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.form = new sap.ui.layout.form.SimpleForm("", {
                        content: [
                        ]
                    });
                    this.page = new sap.m.Page("", {
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
                        content: [this.form]
                    });
                    this.id = this.page.getId();
                    return this.page;
                }
                private tableResult: sap.ui.table.Table;
                private dataTable: ibas.DataTable;

                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    if (!ibas.objects.isNull(this.tableResult)) {
                        this.tableResult.destroy(true);
                    }
                    this.form.destroyContent();
                    this.tableResult = new sap.ui.table.Table("", {
                        enableSelectAll: true,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        editable: false,
                        rows: "{/rows}",
                    });
                    for (let col of table.columns) {
                        col.description = ibas.i18n.prop(col.name);
                        if (col.definedDataType() === ibas.emTableDataType.DATE) {
                            this.tableResult.addColumn(
                                new sap.ui.table.Column("", {
                                    label: ibas.strings.isEmpty(col.description) ? col.name : col.description,
                                    width: "100px",
                                    autoResizable: false,
                                    template: new sap.m.Text("", {
                                        wrapping: false
                                    }).bindProperty("text", {
                                        path: col.name,
                                        formatter(data: any): any {
                                            return ibas.dates.toString(data);
                                        }
                                    })
                                })
                            );
                        } else {
                            this.tableResult.addColumn(
                                new sap.ui.table.Column("", {
                                    label: ibas.strings.isEmpty(col.description) ? col.name : col.description,
                                    width: "100px",
                                    autoResizable: false,
                                    template: new sap.m.Text("", {
                                        wrapping: false
                                    }).bindProperty("text", {
                                        path: col.name,
                                    })
                                })
                            );
                        }
                    }
                    this.tableResult.setModel(new sap.ui.model.json.JSONModel({ rows: table.convert() }));
                    this.form.addContent(this.tableResult);
                    this.dataTable = table;
                }
            }

            /**
             * 视图-报表查看-页签，需要与上保持同步
             */
            export class SystemReportViewTabView extends ReportViewTabView implements app.ISystemReportViewView {
                /** 重置报表 */
                resetReportEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.form = new sap.ui.layout.form.SimpleForm("", {
                        content: [
                        ]
                    });
                    this.page = new sap.m.Page("", {
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
                        content: [this.form]
                    });
                    this.id = this.page.getId();
                    return this.page;
                }
                private tableResult: sap.ui.table.Table;
                private dataTable: ibas.DataTable;
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    if (!ibas.objects.isNull(this.tableResult)) {
                        this.tableResult.destroy(true);
                    }
                    this.form.destroyContent();
                    this.tableResult = new sap.ui.table.Table("", {
                        enableSelectAll: true,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        editable: false,
                        rows: "{/rows}",
                    });
                    for (let col of table.columns) {
                        if (col.definedDataType() === ibas.emTableDataType.DATE) {
                            this.tableResult.addColumn(
                                new sap.ui.table.Column("", {
                                    label: col.name,
                                    width: "100px",
                                    autoResizable: false,
                                    template: new sap.m.Text("", {
                                        wrapping: false
                                    }).bindProperty("text", {
                                        path: col.name,
                                        formatter(data: any): any {
                                            return ibas.dates.toString(data);
                                        }
                                    })
                                })
                            );
                        } else {
                            this.tableResult.addColumn(
                                new sap.ui.table.Column("", {
                                    label: col.name,
                                    width: "100px",
                                    autoResizable: false,
                                    template: new sap.m.Text("", {
                                        wrapping: false
                                    }).bindProperty("text", {
                                        path: col.name,
                                    })
                                })
                            );
                        }
                    }
                    this.tableResult.setModel(new sap.ui.model.json.JSONModel({ rows: table.convert() }));
                    this.form.addContent(this.tableResult);
                    this.dataTable = table;
                }
            }
        }
    }
}