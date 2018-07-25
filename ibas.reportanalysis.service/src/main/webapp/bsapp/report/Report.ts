/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace app {
        /** 报表查看者 */
        export interface IReportViewer extends ibas.IApplication<ibas.IView> {
            /** 报表 */
            report: bo.UserReport;
            /** 运行 */
            run(): void;
            /** 运行 */
            run(report: bo.UserReport): void;
        }
    }
}