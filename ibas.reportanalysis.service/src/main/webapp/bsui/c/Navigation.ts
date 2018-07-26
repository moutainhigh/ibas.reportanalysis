/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../3rdparty/ibas/index.d.ts" />
/// <reference path="../../3rdparty/openui5/index.d.ts" />
/// <reference path="../../index.d.ts" />
/// <reference path="./report/index.ts" />
/// <reference path="./users/index.ts" />
/// <reference path="./reportbook/index.ts" />
namespace reportanalysis {
    export namespace ui {
        /**
         * 视图导航
         */
        export class Navigation extends ibas.ViewNavigation {
            /**
             * 创建实例
             * @param id 应用id
             */
            protected newView(id: string): ibas.IView {
                let view: ibas.IView = null;
                switch (id) {
                    case app.ReportListApp.APPLICATION_ID:
                        view = new c.ReportListView();
                        break;
                    case app.ReportChooseApp.APPLICATION_ID:
                        view = new c.ReportChooseView();
                        break;
                    case app.ReportEditApp.APPLICATION_ID:
                        view = new c.ReportEditView();
                        break;
                    case app.ReportBookListApp.APPLICATION_ID:
                        view = new c.ReportBookListView();
                        break;
                    case app.ReportBookChooseApp.APPLICATION_ID:
                        view = new c.ReportBookChooseView();
                        break;
                    case app.ReportBookEditApp.APPLICATION_ID:
                        view = new c.ReportBookEditView();
                        break;
                    case app.UserReportPageApp.APPLICATION_ID:
                        view = new c.UserReportPageView();
                        break;
                    case app.BOEReportViewApp.APPLICATION_ID:
                        view = new c.BOEReportViewView();
                        break;
                    case app.BOEReportTabViewApp.APPLICATION_ID:
                        view = new c.BOEReportViewTabView();
                        break;
                    case app.SystemReportViewApp.APPLICATION_ID:
                        view = new c.SystemReportViewView();
                        break;
                    case app.SystemReportTabViewApp.APPLICATION_ID:
                        view = new c.SystemReportViewTabView();
                        break;
                    case app.SystemReportDialogViewApp.APPLICATION_ID:
                        view = new c.SystemReportViewDialogView();
                        break;
                    case app.FileReportViewApp.APPLICATION_ID:
                        view = new c.FileReportViewView();
                        break;
                    case app.FileReportTabViewApp.APPLICATION_ID:
                        view = new c.FileReportViewTabView();
                        break;
                    case app.ReportDataService.APPLICATION_ID:
                        view = new c.ReporDataServiceView();
                        break;
                    default:
                        break;
                }
                return view;
            }
        }
    }
}