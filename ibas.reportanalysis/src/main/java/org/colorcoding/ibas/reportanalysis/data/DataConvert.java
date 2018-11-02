package org.colorcoding.ibas.reportanalysis.data;

import org.colorcoding.ibas.bobas.data.DataTable;
import org.colorcoding.ibas.bobas.data.IDataTableColumn;
import org.colorcoding.ibas.bobas.data.IDataTableRow;
import org.colorcoding.ibas.bobas.data.KeyText;

/**
 * 数据转换
 * 
 */
public class DataConvert extends org.colorcoding.ibas.bobas.data.DataConvert {

	public static DataTable toDataTable(KeyText[] values) {
		DataTable table = new DataTable();
		if (values != null) {
			for (KeyText item : values) {
				IDataTableColumn columnKey = table.getColumns().create();
				columnKey.setName("Key");
				columnKey.setDataType(String.class);
				IDataTableColumn columnValue = table.getColumns().create();
				columnValue.setName("Value");
				columnValue.setDataType(String.class);
				IDataTableRow row = table.getRows().create();
				row.setValue(columnKey, item.getKey());
				row.setValue(columnValue, item.getText());
			}
		}
		return table;
	}
}
