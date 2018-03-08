/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace bo {
        /** ReportAnalysis 业务仓库 */
        export interface IBORepositoryReportAnalysis extends ibas.IBORepositoryApplication {
            /**
             * 获取地址
             */
            toUrl(document: bo.IReport): string;
            /**
             * 查询 报表
             * @param fetcher 查询者
             */
            fetchReport(fetcher: ibas.IFetchCaller<bo.IReport>): void;
            /**
             * 保存 报表
             * @param saver 保存者
             */
            saveReport(saver: ibas.ISaveCaller<bo.IReport>): void;
            /**
             * 查询 报表簿
             * @param fetcher 查询者
             */
            fetchReportBook(fetcher: ibas.IFetchCaller<bo.IReportBook>): void;
            /**
             * 保存 报表簿
             * @param saver 保存者
             */
            saveReportBook(saver: ibas.ISaveCaller<bo.IReportBook>): void;
        }

        /**
         * 用户相关调用者
         */
        export interface UserMethodsCaller<P> extends ibas.IMethodCaller<P> {
            /** 用户 */
            user: string;
            /** 平台 */
            platform?: string;
        }
    }
}