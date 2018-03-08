/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

namespace reportanalysis {
    export namespace bo {
        export namespace ibas4j {
            /** ibas的java端数据声明 */

            /** 操作消息 */
            export interface IDataDeclaration {
                /** 数据类型 */
                type: string;
            }
            /** 用户 */
            export interface IUserReport extends IDataDeclaration {
                /** 标识 */
                Id: string;
                /** 名称 */
                Name: string;
                /** 类型 */
                Category: string;
                /** 组 */
                Group: string;
                /** 报表参数 */
                Parameters: IUserReportParameter[];
            }
            /** 用户应用模块 */
            export interface IUserReportParameter extends IDataDeclaration {
                /** 参数名称 */
                Name: string;
                /** 参数类型 */
                Category: string;
                /** 参数说明 */
                Description: string;
                /** 参数值 */
                Value: string;
            }
        }
    }
}