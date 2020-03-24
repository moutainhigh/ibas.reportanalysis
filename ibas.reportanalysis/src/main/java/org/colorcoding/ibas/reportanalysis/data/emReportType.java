package org.colorcoding.ibas.reportanalysis.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 报表类型
 * 
 * @author Niuren.Zhu
 *
 */
public enum emReportType {
	/**
	 * 系统报表
	 */
	@Value("R")
	REPORT,
	/**
	 * 服务报表
	 */
	@Value("S")
	SERVICE,
	/**
	 * 报表文件
	 */
	@Value("F")
	FILE,
	/**
	 * 第三方应用
	 */
	@Value("A")
	THIRD_APP,
}
