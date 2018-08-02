package org.colorcoding.ibas.reportanalysis.reporter;

import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.reportanalysis.data.DataConvert;

/**
 * KPI报表者
 * 
 * @author Niuren.Zhu
 *
 */
public class KpiReporter extends ReportReporter {
	@Override
	public IDataTable run() throws ReportException {
		IDataTable dataTable = super.run();
		KeyText value = new KeyText();
		value.setKey("${Kpi}");
		value.setText("");
		if (dataTable.getColumns().size() > 0 && dataTable.getRows().size() > 0) {
			value.setText(DataConvert.toString(dataTable.getRows().get(0).getValue(0)));
		}
		return this.create(new KeyText[] { value });
	}
}
