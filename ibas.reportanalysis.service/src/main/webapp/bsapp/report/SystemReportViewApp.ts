/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace app {
        /** 查看应用-报表 */
        export class SystemReportViewApp extends ReportViewApp<ISystemReportViewView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "3c42c391-4dc3-4188-a9d7-b6cc757428ea";
            /** 应用名称 */
            static APPLICATION_NAME: string = "reportanalysis_app_report_view";
            /** 构造函数 */
            constructor() {
                super();
                this.id = SystemReportViewApp.APPLICATION_ID;
                this.name = SystemReportViewApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.resetReportEvent = this.viewShowed;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                super.viewShowed();
            }
        }
        /** 视图-报表 */
        export interface ISystemReportViewView extends IReportViewView, ibas.IBOView {
            /** 重置报表 */
            resetReportEvent: Function;
        }
        /** 查看应用-报表-页签 */
        export class SystemReportTabViewApp extends SystemReportViewApp {
            /** 应用标识 */
            static APPLICATION_ID: string = "3c42c391-4dc3-4188-a9d7-b6cc757428eb";
            /** 构造函数 */
            constructor() {
                super();
                this.id = SystemReportTabViewApp.APPLICATION_ID;
            }
        }
        /** 查看应用-报表-对话框 */
        export class SystemReportDialogViewApp extends ReportViewApp<ISystemReportViewDialogView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "8de1af05-1fb3-4b5b-9739-0da0dc4808e6";
            /** 构造函数 */
            constructor() {
                super();
                this.id = SystemReportDialogViewApp.APPLICATION_ID;
                this.name = SystemReportViewApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.resetReportEvent = this.viewShowed;
                this.view.chooseDataEvent = this.chooseData;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                super.viewShowed();
            }
            private chooseData(table: ibas.DataTable): void {
                if (ibas.objects.isNull(table) || table.rows.length <= 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_using")
                    ));
                    return;
                }
                if (this.onChoosedData instanceof Function) {
                    this.onChoosedData(table);
                }
            }
            /** 数据选择完成 */
            onChoosedData: (table: ibas.DataTable) => {};
        }
        /** 视图-报表 */
        export interface ISystemReportViewDialogView extends IReportViewView {
            /** 重置报表 */
            resetReportEvent: Function;
            /** 选择数据 */
            chooseDataEvent: Function;
        }
    }
}