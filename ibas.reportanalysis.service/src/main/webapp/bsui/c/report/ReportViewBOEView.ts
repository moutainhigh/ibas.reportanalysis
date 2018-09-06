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
            /** 配置项目-全屏模式 */
            const CONFIG_ITEM_FULL_SCREEN: string = "fullScreen";
            /** 获取窗口宽度 */
            let getWindowWidth: Function = function (tab: boolean): number {
                let consume: number = 52;
                return window.innerWidth - consume;
            };
            /** 获取窗口高度 */
            let getWindowHeight: Function = function (tab: boolean): number {
                let consume: number = 96;
                if (ibas.config.get(openui5.CONFIG_ITEM_COMPACT_SCREEN) === false) {
                    consume = consume + 8;
                }
                if (ibas.config.get(CONFIG_ITEM_FULL_SCREEN, false)) {
                    consume = consume - 48;
                }
                if (tab === true) {
                    if (ibas.config.get(openui5.CONFIG_ITEM_COMPACT_SCREEN) === false) {
                        consume = consume - 48 + 48;
                    } else {
                        consume = consume - 40 + 32;
                    }
                }
                return window.innerHeight - consume;
            };
            let createHTML: Function = function (url: string, tab: boolean): string {
                if (ibas.objects.isNull(url)) {
                    return "";
                }
                return ibas.strings.format(
                    `<iframe src="{0}" width="{1}" height="{2}" frameborder="no" border="0" scrolling="no"></iframe>`,
                    encodeURI(url), getWindowWidth(tab), getWindowHeight(tab));
            };
            /**
             * 视图-Report
             */
            export class BOEReportViewView extends ReportViewView {
                /** 运行报表 */
                runReportEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.form = new sap.m.HBox("", {
                        content: [
                        ]
                    });
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Bar("", {
                            contentLeft: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_run"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://begin",
                                    press: function (): void {
                                        that.fireViewEvents(that.runReportEvent);
                                    }
                                }),
                            ],
                        }),
                        content: [this.form]
                    });
                    return this.page;
                }
                private tableResult: sap.ui.table.Table;
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    if (!ibas.objects.isNull(this.tableResult)) {
                        this.tableResult.destroy(true);
                    }
                    this.form.destroyItems();
                    this.page.setShowSubHeader(false);
                    let datas: any[] = table.convert();
                    if (datas.length === 1) {
                        let data: any = datas[0];
                        if (data.Key === "${Url}") {
                            this.application.viewShower.proceeding(this,
                                ibas.emMessageType.INFORMATION,
                                ibas.i18n.prop("reportanalysis_running_report", data.Value),
                            );
                            this.form.addItem(
                                new sap.ui.core.HTML("", {
                                    content: createHTML(data.Value, false),
                                    preferDOM: false,
                                    sanitizeContent: true,
                                    visible: true,
                                })
                            );
                            /*
                            window.open(data.Value, this.application.description,
                                "toolbar=no, menubar=no, location=no, status=no, titlebar=no, fullscreen=yes");
                            */
                        }
                    }
                }
            }
            /**
             * 视图-报表查看-页签，需要与上保持同步
             */
            export class BOEReportViewTabView extends ReportViewTabView {
                /** 运行报表 */
                runReportEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.form = new sap.m.HBox("", {
                        content: [
                        ]
                    });
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Bar("", {
                            contentLeft: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_run"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://begin",
                                    press: function (): void {
                                        that.fireViewEvents(that.runReportEvent);
                                    }
                                }),
                            ],
                        }),
                        content: [this.form]
                    });
                    this.id = this.page.getId();
                    return this.page;
                }
                private tableResult: sap.ui.table.Table;
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    if (!ibas.objects.isNull(this.tableResult)) {
                        this.tableResult.destroy(true);
                    }
                    this.form.destroyItems();
                    this.page.setShowSubHeader(false);
                    let datas: any[] = table.convert();
                    if (datas.length === 1) {
                        let data: any = datas[0];
                        if (data.Key === "${Url}") {
                            this.application.viewShower.proceeding(this,
                                ibas.emMessageType.INFORMATION,
                                ibas.i18n.prop("reportanalysis_running_report", data.Value),
                            );
                            this.form.addItem(
                                new sap.ui.core.HTML("", {
                                    content: createHTML(data.Value, true),
                                    preferDOM: false,
                                    sanitizeContent: true,
                                    visible: true,
                                })
                            );
                            /*
                            window.open(data.Value, this.application.description,
                                "toolbar=no, menubar=no, location=no, status=no, titlebar=no, fullscreen=yes");
                            */
                        }
                    }
                }
            }
        }
    }
}