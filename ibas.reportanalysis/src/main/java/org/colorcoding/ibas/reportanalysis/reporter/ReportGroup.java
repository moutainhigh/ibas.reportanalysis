package org.colorcoding.ibas.reportanalysis.reporter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.serialization.Serializable;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "ReportGroup", namespace = MyConfiguration.NAMESPACE_REPORTER)
public class ReportGroup extends Serializable {

	private static final long serialVersionUID = 5648690702888716667L;

	private int id;

	@XmlElement(name = "Id")
	public final int getId() {
		return id;
	}

	public final void setId(int id) {
		this.id = id;
	}

	private int parentId;

	@XmlElement(name = "ParentId")
	public final int getParentId() {
		return parentId;
	}

	public final void setParentId(int parentId) {
		this.parentId = parentId;
	}

	private String name;

	@XmlElement(name = "Name")
	public final String getName() {
		return name;
	}

	public final void setName(String name) {
		this.name = name;
	}

	public String toString() {
		return String.format("{group: %s}", this.getName());
	}
}
