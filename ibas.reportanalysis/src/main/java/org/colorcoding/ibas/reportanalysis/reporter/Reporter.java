package org.colorcoding.ibas.reportanalysis.reporter;

import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.i18n.I18N;

public abstract class Reporter implements IReporter {

	private ExecuteReport report;

	protected final ExecuteReport getReport() {
		return report;
	}

	private final void setReport(ExecuteReport report) {
		this.report = report;
	}

	protected String getParameterValue(String name) throws ReporterException {
		if (this.getReport() != null) {
			for (ExecuteReportParameter item : this.getReport().getParameters()) {
				if (name.equalsIgnoreCase(item.getName())) {
					return item.getValue();
				}
			}
		}
		throw new ReporterException(I18N.prop("msg_ra_not_found_report_parameter", name));
	}

	/**
	 * 运行报表
	 * 
	 * @param report 用户报表
	 * @return
	 * @throws Exception
	 */
	public IDataTable run(ExecuteReport report) throws ReporterException {
		this.setReport(report);
		return this.run();
	}

	protected abstract IDataTable run() throws ReporterException;
}
