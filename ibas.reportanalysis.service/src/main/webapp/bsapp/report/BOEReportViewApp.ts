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
        export class BOEReportViewApp extends ReportViewApp<IReportViewView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "fe4385ed-a329-47e5-b6bb-5273b63e20ba";
            /** 应用名称 */
            static APPLICATION_NAME: string = "reportanalysis_app_report_view";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOEReportViewApp.APPLICATION_ID;
                this.name = BOEReportViewApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                super.viewShowed();
            }
        }
        /** 查看应用-报表-页签 */
        export class BOEReportTabViewApp extends BOEReportViewApp {
            /** 应用标识 */
            static APPLICATION_ID: string = "fe4385ed-a329-47e5-b6bb-5273b63e20bb";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOEReportTabViewApp.APPLICATION_ID;
            }
        }
    }
}