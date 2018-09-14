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
            export abstract class ReportViewView extends ibas.View implements app.IReportViewView {
                /** 运行报表 */
                runReportEvent: Function;
                /** 绘制视图 */
                abstract draw(): any;
                protected page: sap.m.Page;
                protected form: sap.m.VBox;
                /** 显示报表 */
                showReport(report: bo.UserReport): void {
                    this.form.destroyItems();
                    drawParameterUIs(this.form, report.parameters);
                }
                /** 显示报表结果 */
                abstract showResults(table: ibas.DataTable): void;
            }

            /**
             * 视图-报表查看-页签，需要与上保持同步
             */
            export abstract class ReportViewTabView extends ibas.TabView implements app.IReportViewView {
                /** 运行报表 */
                runReportEvent: Function;
                /** 绘制视图 */
                abstract draw(): any;
                protected page: sap.m.Page;
                protected form: sap.m.VBox;
                /** 显示报表 */
                showReport(report: bo.UserReport): void {
                    this.form.destroyItems();
                    drawParameterUIs(this.form, report.parameters);
                }
                /** 显示报表结果 */
                abstract showResults(table: ibas.DataTable): void;
            }

            /**
             * 视图-报表查看-对话框，需要与上保持同步
             */
            export abstract class ReportViewDialogView extends ibas.BODialogView implements app.IReportViewView {
                /** 运行报表 */
                runReportEvent: Function;
                /** 绘制视图 */
                abstract draw(): any;
                protected form: sap.m.VBox;
                /** 显示报表 */
                showReport(report: bo.UserReport): void {
                    this.form.destroyItems();
                    drawParameterUIs(this.form, report.parameters);
                }
                /** 显示报表结果 */
                abstract showResults(table: ibas.DataTable): void;
            }
            function drawParameterUIs(form: sap.m.VBox, parameters: bo.UserReportParameter[]): void {
                if (ibas.objects.isNull(parameters) || parameters.length === 0) {
                    return;
                }
                form.addItem(
                    new sap.m.Title("", {
                        level: sap.ui.core.TitleLevel.H2,
                        titleStyle: sap.ui.core.TitleLevel.H2,
                        textAlign: sap.ui.core.TextAlign.Center,
                        text: "",
                    })
                );
                form.addItem(
                    new sap.m.Title("", {
                        level: sap.ui.core.TitleLevel.H3,
                        titleStyle: sap.ui.core.TitleLevel.H3,
                        textAlign: sap.ui.core.TextAlign.Center,
                        text: ibas.i18n.prop("reportanalysis_running_parameters"),
                    })
                );
                form.addItem(
                    new sap.m.Title("", {
                        level: sap.ui.core.TitleLevel.H4,
                        titleStyle: sap.ui.core.TitleLevel.H4,
                        textAlign: sap.ui.core.TextAlign.Center,
                        text: "",
                    })
                );
                for (let item of parameters) {
                    if (item.category === bo.emReportParameterType.PRESET) {
                        // 预设的不显示
                        continue;
                    }
                    form.addItem(
                        new sap.m.Title("", {
                            width: "260px",
                            level: sap.ui.core.TitleLevel.H5,
                            titleStyle: sap.ui.core.TitleLevel.H5,
                            textAlign: sap.ui.core.TextAlign.Left,
                            text: ibas.objects.isNull(item.description) ? item.name.replace("\$\{", "").replace("\}", "") : item.description
                        })
                    );
                    let input: sap.ui.core.Control;
                    if (item.category === bo.emReportParameterType.DATETIME) {
                        input = new sap.m.DatePicker("", {
                            width: "260px",
                            valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                            displayFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                        });
                        input.bindProperty("value", {
                            path: "/value"
                        });
                    } else if (item.category === bo.emReportParameterType.SYSTEM) {
                        input = new sap.m.Input("", {
                            width: "260px",
                            editable: false,
                        });
                        input.bindProperty("value", {
                            path: "/value"
                        });
                    } else if (item.category === bo.emReportParameterType.RANGE) {
                        let values: Array<sap.ui.core.Item> = new Array<sap.ui.core.Item>();
                        for (let value of item.value.split(";")) {
                            if (ibas.strings.isEmpty(value)) {
                                continue;
                            }
                            values.push(new sap.ui.core.Item("", {
                                key: value,
                                text: value
                            }));
                        }
                        input = new sap.m.Select("", {
                            width: "260px",
                            items: values
                        });
                        input.bindProperty("selectedKey", {
                            path: "/value"
                        });
                    } else {
                        input = new sap.m.Input("", {
                            width: "260px",
                        });
                        input.bindProperty("value", {
                            path: "/value"
                        });
                    }
                    input.setModel(new sap.ui.model.json.JSONModel(item));
                    form.addItem(input);
                }
            }
        }
    }
}