package org.colorcoding.ibas.reportanalysis.reporter;

import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.reportanalysis.data.DataConvert;

/**
 * 文件报表者
 * 
 * @author Niuren.Zhu
 *
 */
public class FileReporter extends Reporter {

	public static final String PARAMETER_NAME_URL = "${Url}";
	public static final String PARAMETER_NAME_ADDRESS = String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE,
			Report.PROPERTY_ADDRESS.getName());

	public String getAddress() throws ReporterException {
		return this.getParameterValue(PARAMETER_NAME_ADDRESS);
	}

	@Override
	protected IDataTable run() throws ReporterException {
		try {
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append(this.getAddress());
			int length = stringBuilder.length();
			for (ExecuteReportParameter item : this.getReport().getParameters()) {
				if (item.getName().equalsIgnoreCase(PARAMETER_NAME_ADDRESS)
						|| item.getName().equalsIgnoreCase(PARAMETER_NAME_URL)) {
					// 跳过已使用变量
					continue;
				}
				if (length == stringBuilder.length()) {
					stringBuilder.append("?");
				} else {
					stringBuilder.append("&");
				}
				stringBuilder.append(item.getName().replace("${", "").replace("}", ""));
				stringBuilder.append("=");
				stringBuilder.append(item.getValue());
			}
			KeyText keyText = new KeyText();
			keyText.setKey(PARAMETER_NAME_URL);
			keyText.setText(stringBuilder.toString());
			IDataTable dataTable = DataConvert.toDataTable(new KeyText[] { keyText });
			dataTable.setName(this.getReport().getId());
			dataTable.setDescription(this.getReport().getName());
			return dataTable;
		} catch (Exception e) {
			throw new ReporterException(e);
		}
	}
}
