package org.colorcoding.ibas.reportanalysis.reporter;

import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.reportanalysis.data.DataConvert;

/**
 * 文件报表者
 * 
 * @author Niuren.Zhu
 *
 */
public class RemoteReporter extends Reporter {

	public static final String PARAMETER_NAME_URL = "${Url}";

	public static final String PARAMETER_NAME_SERVER = String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE,
			Report.PROPERTY_SERVER.getName());
	public static final String PARAMETER_NAME_USER = String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE,
			Report.PROPERTY_USER.getName());
	public static final String PARAMETER_NAME_PASSWORD = String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE,
			Report.PROPERTY_PASSWORD.getName());
	public static final String PARAMETER_NAME_ADDRESS = String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE,
			Report.PROPERTY_ADDRESS.getName());

	public String getServer() throws ReporterException {
		return this.getParameterValue(PARAMETER_NAME_SERVER);
	}

	public String getUser() throws ReporterException {
		return this.getParameterValue(PARAMETER_NAME_USER);
	}

	public String getPassword() throws ReporterException {
		return this.getParameterValue(PARAMETER_NAME_PASSWORD);
	}

	public String getAddress() throws ReporterException {
		return this.getParameterValue(PARAMETER_NAME_ADDRESS);
	}

	@Override
	protected IDataTable run() throws ReporterException {
		try {
			StringBuilder stringBuilder = new StringBuilder();
			try {
				stringBuilder.append(this.getServer());
			} catch (Exception e) {
			}
			stringBuilder.append(this.getAddress());
			int length = stringBuilder.length();
			for (ExecuteReportParameter item : this.getReport().getParameters()) {
				if (item.getName().equalsIgnoreCase(PARAMETER_NAME_USER)
						|| item.getName().equalsIgnoreCase(PARAMETER_NAME_PASSWORD)
						|| item.getName().equalsIgnoreCase(PARAMETER_NAME_ADDRESS)
						|| item.getName().equalsIgnoreCase(PARAMETER_NAME_URL)
						|| item.getName().equalsIgnoreCase(PARAMETER_NAME_SERVER)) {
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
			String url = stringBuilder.toString();
			if (url == null || url.isEmpty()) {
				throw new ReporterException(I18N.prop("msg_ra_invaild_report_url",
						this.getReport().getName() != null ? this.getReport().getName() : this.getReport().getId()));
			}

			KeyText keyText = new KeyText();
			keyText.setKey(PARAMETER_NAME_URL);
			keyText.setText(stringBuilder.toString());
			return DataConvert.toDataTable(new KeyText[] { keyText });

		} catch (Exception e) {
			throw new ReporterException(e);
		}
	}
}
