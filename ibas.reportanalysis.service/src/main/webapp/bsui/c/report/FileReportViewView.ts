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
                let consume: number = 96;
                return window.innerWidth - consume;
            };
            /** 获取窗口高度 */
            let getWindowHeight: Function = function (tab: boolean): number {
                let consume: number = 86;
                if (ibas.config.get(CONFIG_ITEM_FULL_SCREEN, false)) {
                    consume = consume - 50;
                }
                if (tab) {
                    consume = consume + 50;
                }
                return window.innerHeight - consume;
            };
            let showResults: Function = function (table: ibas.DataTable, page: sap.m.Page): void {
                let datas: any[] = table.convert();
                if (datas.length === 1) {
                    let data: any = datas[0];
                    if (data.Key === "${Url}") {
                        if (data.Value.endsWith(".swf")) {
                            let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                            let url: string = boRepository.toUrl(data.Value);
                            // 忽略缓存
                            url = url + (url.indexOf("?") > 0 ? "&" : "?") + "_=" + ibas.dates.now().getTime().toString();
                            page.addContent(new sap.ui.core.HTML("", {
                                content: ibas.strings.format("<embed src='{0}' type='application/x-shockwave-flash' \
                    style= 'width:100%; \
                    height:-webkit-fill-available;height: -moz-fill-available; \
                    height: -moz-available;height: fill-available;' />", url)
                            }));
                            return;
                        }
                    }
                }
                // 获取失败
                page.addContent(new sap.m.MessagePage("", {
                    showHeader: false,
                    showNavButton: false,
                }));
            };
            /**
             * 视图-Report
             */
            export class FileReportViewView extends ReportViewView {
                /** 运行报表 */
                runReportEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
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
                    this.page.destroyContent();
                    this.page.setShowSubHeader(false);
                    showResults(table, this.page);
                }
            }
            /**
             * 视图-报表查看-页签，需要与上保持同步
             */
            export class FileReportViewTabView extends ReportViewTabView {
                /** 运行报表 */
                runReportEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
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
                    this.page.destroyContent();
                    this.page.setShowSubHeader(false);
                    showResults(table, this.page);
                }
            }
        }
    }
}