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
            export class ReportEditView extends ibas.BOEditView implements app.IReportEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加报表参数事件 */
                addReportParameterEvent: Function;
                /** 删除报表参数事件 */
                removeReportParameterEvent: Function;
                /** 报表-业务对象选择 */
                chooseReportBusinessObjectEvent: Function;
                /** 报表-应用选择 */
                chooseReportApplicationEvent: Function;
                /** 报表-报表选择 */
                chooseReportAssociatedReportEvent: Function;
                /** 报表参数-系统变量选择 */
                chooseReportParameterVariableEvent: Function;
                /** 上传报表文件 */
                uploadReportEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.form = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("reportanalysis_title_basic") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_name") }),
                            new sap.m.Input("", {
                            }).bindProperty("value", {
                                path: "/name"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_group") }),
                            new sap.m.Input("", {
                            }).bindProperty("value", {
                                path: "/group"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_activated") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(ibas.emYesNo)
                            }).bindProperty("selectedKey", {
                                path: "/activated",
                                type: "sap.ui.model.type.Integer"
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("reportanalysis_title_associated") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_bocode") }),
                            new sap.m.Input("", {
                                showValueHelp: true,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseReportBusinessObjectEvent);
                                }
                            }).bindProperty("value", {
                                path: "/boCode"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_applicationid") }),
                            new sap.m.Input("", {
                                showValueHelp: true,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseReportApplicationEvent);
                                }
                            }).bindProperty("value", {
                                path: "/applicationId"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_associatedreport") }),
                            new sap.m.ex.BOInput("", {
                                boText: "name",
                                boKey: "objectKey",
                                boCode: ibas.config.applyVariables(bo.BO_CODE_REPORT),
                                repositoryName: bo.BO_REPOSITORY_REPORTANALYSIS,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseReportAssociatedReportEvent);
                                },
                                bindingValue: {
                                    path: "/associatedReport"
                                }
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("reportanalysis_title_content") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_category") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(bo.emReportType)
                            }).bindProperty("selectedKey", {
                                path: "/category",
                                type: "sap.ui.model.type.Integer"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_sqlstring") }),
                            new sap.m.TextArea("", {
                                rows: 9
                            }).bindProperty("value", {
                                path: "/sqlString"
                            }).bindProperty("editable", {
                                path: "/category",
                                formatter(data: bo.emReportType): any {
                                    if (data === bo.emReportType.REPORT) {
                                        return true;
                                    }
                                    return false;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_server") }),
                            new sap.m.Input("", {
                            }).bindProperty("value", {
                                path: "/server"
                            }).bindProperty("editable", {
                                path: "/category",
                                formatter(data: bo.emReportType): any {
                                    if (data === bo.emReportType.BOE) {
                                        return true;
                                    } else if (data === bo.emReportType.KPI) {
                                        return true;
                                    }
                                    return false;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_user") }),
                            new sap.m.Input("", {
                            }).bindProperty("value", {
                                path: "/user"
                            }).bindProperty("editable", {
                                path: "/category",
                                formatter(data: bo.emReportType): any {
                                    if (data === bo.emReportType.BOE) {
                                        return true;
                                    } else if (data === bo.emReportType.KPI) {
                                        return true;
                                    }
                                    return false;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_password") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Password
                            }).bindProperty("value", {
                                path: "/password"
                            }).bindProperty("editable", {
                                path: "/category",
                                formatter(data: bo.emReportType): any {
                                    if (data === bo.emReportType.BOE) {
                                        return true;
                                    } else if (data === bo.emReportType.KPI) {
                                        return true;
                                    }
                                    return false;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_address") }),
                            new sap.m.Input("", {
                            }).bindProperty("value", {
                                path: "/address"
                            }).bindProperty("editable", {
                                path: "/category",
                                formatter(data: bo.emReportType): any {
                                    if (data === bo.emReportType.BOE) {
                                        return true;
                                    } else if (data === bo.emReportType.KPI) {
                                        return true;
                                    }
                                    return false;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("reportanalysis_report_file") }),
                            new sap.ui.unified.FileUploader("", {
                                name: "file",
                                width: "100%",
                                placeholder: ibas.i18n.prop("shell_browse"),
                                change(event: sap.ui.base.Event): void {
                                    if (ibas.objects.isNull(event.getParameters())
                                        || ibas.objects.isNull(event.getParameters().files)
                                        || event.getParameters().files.length === 0) {
                                        return;
                                    }
                                    let fileData: FormData = new FormData();
                                    fileData.append("file", event.getParameters().files[0], encodeURI(event.getParameters().newValue));
                                    that.application.viewShower.messages({
                                        type: ibas.emMessageType.QUESTION,
                                        title: that.application.description,
                                        actions: [
                                            ibas.emMessageAction.YES,
                                            ibas.emMessageAction.NO
                                        ],
                                        message: ibas.i18n.prop("reportanalysis_upload_report"),
                                        onCompleted(action: ibas.emMessageAction): void {
                                            if (action === ibas.emMessageAction.YES) {
                                                that.fireViewEvents(that.uploadReportEvent, fileData);
                                            }
                                        }
                                    });
                                }
                            }).bindProperty("enabled", {
                                path: "/category",
                                formatter(data: bo.emReportType): any {
                                    if (data === bo.emReportType.FILE) {
                                        return true;
                                    }
                                    return false;
                                }
                            }),
                        ]
                    });
                    this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("reportanalysis_title_parameters") }));
                    this.tableReportParameter = new sap.ui.table.Table("", {
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_add"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    press: function (): void {
                                        that.fireViewEvents(that.addReportParameterEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.removeReportParameterEvent,
                                            // 获取表格选中的对象
                                            openui5.utils.getSelecteds<bo.ReportParameter>(that.tableReportParameter)
                                        );
                                    }
                                })
                            ]
                        }),
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        visibleRowCount: 6,
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_reportparameter_name"),
                                template: new sap.m.Input("", {
                                    width: "100%",
                                }).bindProperty("value", {
                                    path: "name",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_reportparameter_description"),
                                template: new sap.m.Input("", {
                                    width: "100%",
                                }).bindProperty("value", {
                                    path: "description",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_reportparameter_category"),
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    items: openui5.utils.createComboBoxItems(bo.emReportParameterType)
                                }).bindProperty("selectedKey", {
                                    path: "category",
                                    type: "sap.ui.model.type.Integer"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_reportparameter_value"),
                                template: new sap.m.Input("", {
                                    width: "100%",
                                    showValueHelp: true,
                                    valueHelpRequest: function (): void {
                                        that.fireViewEvents(that.chooseReportParameterVariableEvent,
                                            // 获取当前对象
                                            this.getBindingContext().getObject()
                                        );
                                    }
                                }).bindProperty("value", {
                                    path: "value",
                                })
                            }),
                        ]
                    });
                    this.form.addContent(this.tableReportParameter);
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press: function (): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.strings.format("{0}/{1}",
                                        ibas.i18n.prop("shell_data_new"), ibas.i18n.prop("shell_data_clone")),
                                    icon: "sap-icon://create",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_new"),
                                                icon: "sap-icon://create",
                                                press: function (): void {
                                                    // 创建新的对象
                                                    that.fireViewEvents(that.createDataEvent, false);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_clone"),
                                                icon: "sap-icon://copy",
                                                press: function (): void {
                                                    // 复制当前对象
                                                    that.fireViewEvents(that.createDataEvent, true);
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                        content: [this.form]
                    });
                    this.id = this.page.getId();
                    return this.page;
                }
                private page: sap.m.Page;
                private form: sap.ui.layout.form.SimpleForm;
                /** 改变视图状态 */
                private changeViewStatus(data: bo.Report): void {
                    if (ibas.objects.isNull(data)) {
                        return;
                    }
                    // 新建时：禁用删除，
                    if (data.isNew) {
                        if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                            openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                        }
                    }
                    // 不可编辑：已批准，
                    /*
                    if (data.approvalStatus === ibas.emApprovalStatus.APPROVED) {
                        if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                            openui5.utils.changeToolbarSavable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                            openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                        }
                        openui5.utils.changeFormEditable(this.form, false);
                    }
                    */
                }
                private tableReportParameter: sap.ui.table.Table;

                /** 显示数据 */
                showReport(data: bo.Report): void {
                    this.form.setModel(new sap.ui.model.json.JSONModel(data));
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.form, data);
                    // 改变视图状态
                    this.changeViewStatus(data);
                }
                /** 显示数据 */
                showReportParameters(datas: bo.ReportParameter[]): void {
                    this.tableReportParameter.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.tableReportParameter, datas);
                }
            }
        }
    }
}